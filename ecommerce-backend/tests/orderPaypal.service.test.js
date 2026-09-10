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
jest.mock('../src/services/PaymentService', () => ({
    createOrder: jest.fn(),
    captureOrder: jest.fn(),
    refundCapture: jest.fn(),
    extractCaptureResult: jest.fn(),
}))

const Product = require('../src/models/ProductModel')
const Order = require('../src/models/OrderProduct')
const PaymentService = require('../src/services/PaymentService')
const OrderService = require('../src/services/OrderService')

const makeProduct = (overrides) => ({
    _id: 'prod-1',
    name: 'Widget',
    price: 30,
    discount: 0,
    countInStock: 100,
    ...overrides,
})

const baseOrderInput = {
    paymentMethod: 'paypal',
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

describe('OrderService.createPaypalOrder', () => {
    it('creates a PayPal order for the server-recomputed total, ignoring any client-sent price', async () => {
        const product = makeProduct({ price: 100 })
        Product.findById.mockResolvedValue(product)
        PaymentService.createOrder.mockResolvedValue({ id: 'PAYPAL-ORDER-1' })

        const result = await OrderService.createPaypalOrder({
            orderItems: [{ product: 'prod-1', amount: 2, name: 'Widget' }],
            totalPrice: 0.01, // attacker-supplied, must be ignored
        })

        expect(result.status).toBe('OK')
        expect(result.paypalOrderId).toBe('PAYPAL-ORDER-1')
        expect(result.totalPrice).toBe(200) // 2 * $100, free shipping tier
        expect(PaymentService.createOrder).toHaveBeenCalledWith(200)
    })

    it('rejects when a product in the cart does not exist, without calling PayPal', async () => {
        Product.findById.mockResolvedValue(null)

        const result = await OrderService.createPaypalOrder({
            orderItems: [{ product: 'ghost', amount: 1, name: 'Ghost' }],
        })

        expect(result.status).toBe('ERR')
        expect(PaymentService.createOrder).not.toHaveBeenCalled()
    })
})

describe('OrderService.capturePaypalOrder', () => {
    it('completes the order when the captured amount matches the recomputed total', async () => {
        const product = makeProduct({ price: 100 })
        Product.findById.mockResolvedValue(product)
        Product.findOneAndUpdate.mockResolvedValue(product)
        PaymentService.captureOrder.mockResolvedValue({ raw: 'response' })
        PaymentService.extractCaptureResult.mockReturnValue({
            status: 'COMPLETED',
            captureId: 'CAPTURE-1',
            amount: 200,
        })

        const result = await OrderService.capturePaypalOrder('PAYPAL-ORDER-1', {
            ...baseOrderInput,
            orderItems: [{ product: 'prod-1', amount: 2, name: 'Widget' }],
        })

        expect(result.status).toBe('OK')
        expect(Order.create).toHaveBeenCalledTimes(1)
        const created = Order.create.mock.calls[0][0]
        expect(created.isPaid).toBe(true)
        expect(created.totalPrice).toBe(200)
        expect(PaymentService.refundCapture).not.toHaveBeenCalled()
    })

    it('rejects and does NOT create the order if PayPal reports the capture as not completed', async () => {
        const product = makeProduct({ price: 100 })
        Product.findById.mockResolvedValue(product)
        PaymentService.captureOrder.mockResolvedValue({ raw: 'response' })
        PaymentService.extractCaptureResult.mockReturnValue({
            status: 'PENDING',
            captureId: 'CAPTURE-1',
            amount: 200,
        })

        const result = await OrderService.capturePaypalOrder('PAYPAL-ORDER-1', {
            ...baseOrderInput,
            orderItems: [{ product: 'prod-1', amount: 2, name: 'Widget' }],
        })

        expect(result.status).toBe('ERR')
        expect(Order.create).not.toHaveBeenCalled()
    })

    it('refunds and rejects the order when the captured amount does not match the recomputed total (tampered/replayed cart)', async () => {
        const product = makeProduct({ price: 100 })
        Product.findById.mockResolvedValue(product)
        PaymentService.captureOrder.mockResolvedValue({ raw: 'response' })
        PaymentService.extractCaptureResult.mockReturnValue({
            status: 'COMPLETED',
            captureId: 'CAPTURE-1',
            amount: 1, // real payment was only for $1, but cart resent at capture time totals $200
        })

        const result = await OrderService.capturePaypalOrder('PAYPAL-ORDER-1', {
            ...baseOrderInput,
            orderItems: [{ product: 'prod-1', amount: 2, name: 'Widget' }],
        })

        expect(result.status).toBe('ERR')
        expect(result.message).toMatch(/refunded/i)
        expect(PaymentService.refundCapture).toHaveBeenCalledWith('CAPTURE-1')
        expect(Order.create).not.toHaveBeenCalled()
    })

    it('auto-refunds when the payment completes but stock ran out in the meantime', async () => {
        const product = makeProduct({ price: 100 })
        Product.findById.mockResolvedValue(product)
        Product.findOneAndUpdate.mockResolvedValue(null) // atomic $gte stock check failed
        PaymentService.captureOrder.mockResolvedValue({ raw: 'response' })
        PaymentService.extractCaptureResult.mockReturnValue({
            status: 'COMPLETED',
            captureId: 'CAPTURE-1',
            amount: 200,
        })

        const result = await OrderService.capturePaypalOrder('PAYPAL-ORDER-1', {
            ...baseOrderInput,
            orderItems: [{ product: 'prod-1', amount: 2, name: 'Widget' }],
        })

        expect(result.status).toBe('ERR')
        expect(result.message).toMatch(/out of stock/i)
        expect(result.message).toMatch(/refunded/i)
        expect(PaymentService.refundCapture).toHaveBeenCalledWith('CAPTURE-1')
        expect(Order.create).not.toHaveBeenCalled()
    })
})
