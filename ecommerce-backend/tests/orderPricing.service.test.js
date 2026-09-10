jest.mock('../src/models/ProductModel', () => ({
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
}))
jest.mock('../src/models/OrderProduct', () => ({
    create: jest.fn(),
}))
jest.mock('../src/services/EmailService', () => ({
    sendEmailCreateOrder: jest.fn().mockResolvedValue(true),
}))

const Product = require('../src/models/ProductModel')
const Order = require('../src/models/OrderProduct')
const OrderService = require('../src/services/OrderService')

const makeProduct = (overrides) => ({
    _id: 'prod-1',
    name: 'Widget',
    price: 30,
    discount: 0,
    countInStock: 100,
    ...overrides,
})

const baseNewOrder = {
    paymentMethod: 'later_money',
    fullName: 'Jane Doe',
    address: '123 Main St',
    city: 'Metropolis',
    phone: 5551234567,
    user: 'user-1',
    email: 'jane@example.com',
}

beforeEach(() => {
    jest.clearAllMocks()
    Order.create.mockResolvedValue({ _id: 'order-1' })
})

describe('OrderService.createOrder pricing', () => {
    it('ignores client-supplied itemsPrice/shippingPrice/totalPrice and computes them from live Product data', async () => {
        const product = makeProduct({ _id: 'prod-1', price: 100, discount: 0 })
        Product.findById.mockResolvedValue(product)
        Product.findOneAndUpdate.mockResolvedValue({ ...product, countInStock: 98 })

        const newOrder = {
            ...baseNewOrder,
            orderItems: [{ product: 'prod-1', amount: 2, name: 'Widget' }],
            // attacker-supplied lowball values - must be ignored
            itemsPrice: 0.01,
            shippingPrice: 0,
            totalPrice: 0.01,
        }

        const result = await OrderService.createOrder(newOrder)

        expect(result.status).toBe('OK')
        expect(Order.create).toHaveBeenCalledTimes(1)
        const created = Order.create.mock.calls[0][0]
        // 2 * $100, no discount, subtotal $200 -> free shipping tier
        expect(created.itemsPrice).toBe(200)
        expect(created.shippingPrice).toBe(0)
        expect(created.totalPrice).toBe(200)
    })

    it('applies each line item\'s discount only to that line, not the whole cart subtotal', async () => {
        const productA = makeProduct({ _id: 'prod-a', price: 10, discount: 50 }) // $5/unit after discount
        const productB = makeProduct({ _id: 'prod-b', price: 10, discount: 0 })  // $10/unit
        Product.findById.mockImplementation((id) => {
            if (id === 'prod-a') return Promise.resolve(productA)
            if (id === 'prod-b') return Promise.resolve(productB)
            return Promise.resolve(null)
        })
        Product.findOneAndUpdate.mockResolvedValue(productA)

        const newOrder = {
            ...baseNewOrder,
            orderItems: [
                { product: 'prod-a', amount: 1, name: 'A' },
                { product: 'prod-b', amount: 1, name: 'B' },
            ],
        }

        await OrderService.createOrder(newOrder)

        const created = Order.create.mock.calls[0][0]
        // correct: (10*0.5*1) + (10*1) = 15
        // old buggy frontend formula would instead scale the *whole* subtotal
        // by productA's discount%, giving a different (wrong) number
        expect(created.itemsPrice).toBe(15)
    })

    it.each([
        [5, 20],    // under $20 subtotal -> $20 shipping
        [20, 10],   // $20-49.99 -> $10 shipping
        [49.99, 10],
        [50, 0],    // $50+ -> free shipping
        [100, 0],
    ])('charges $%s subtotal -> $%s shipping', async (subtotal, expectedShipping) => {
        const product = makeProduct({ _id: 'prod-1', price: subtotal, discount: 0 })
        Product.findById.mockResolvedValue(product)
        Product.findOneAndUpdate.mockResolvedValue(product)

        const newOrder = {
            ...baseNewOrder,
            orderItems: [{ product: 'prod-1', amount: 1, name: 'Widget' }],
        }

        await OrderService.createOrder(newOrder)

        const created = Order.create.mock.calls[0][0]
        expect(created.shippingPrice).toBe(expectedShipping)
    })

    it('forces isPaid=false and paidAt=null even if the client sends isPaid:true', async () => {
        const product = makeProduct()
        Product.findById.mockResolvedValue(product)
        Product.findOneAndUpdate.mockResolvedValue(product)

        const newOrder = {
            ...baseNewOrder,
            orderItems: [{ product: 'prod-1', amount: 1, name: 'Widget' }],
            isPaid: true,
            paidAt: '2020-01-01T00:00:00.000Z',
        }

        await OrderService.createOrder(newOrder)

        const created = Order.create.mock.calls[0][0]
        expect(created.isPaid).toBe(false)
        expect(created.paidAt).toBe(null)
    })

    it('rejects the order if a product id does not exist, without decrementing any stock', async () => {
        Product.findById.mockResolvedValue(null)

        const newOrder = {
            ...baseNewOrder,
            orderItems: [{ product: 'does-not-exist', amount: 1, name: 'Ghost' }],
        }

        const result = await OrderService.createOrder(newOrder)

        expect(result.status).toBe('ERR')
        expect(Product.findOneAndUpdate).not.toHaveBeenCalled()
        expect(Order.create).not.toHaveBeenCalled()
    })

    it('still rejects out-of-stock orders after pricing is computed', async () => {
        const product = makeProduct({ countInStock: 1 })
        Product.findById.mockResolvedValue(product)
        Product.findOneAndUpdate.mockResolvedValue(null) // atomic $gte check failed

        const newOrder = {
            ...baseNewOrder,
            orderItems: [{ product: 'prod-1', amount: 5, name: 'Widget' }],
        }

        const result = await OrderService.createOrder(newOrder)

        expect(result.status).toBe('ERR')
        expect(result.message).toMatch(/out of stock/i)
        expect(Order.create).not.toHaveBeenCalled()
    })
})
