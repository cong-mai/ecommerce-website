const request = require('supertest')
const jwt = require('jsonwebtoken')
const createApp = require('../src/app')

jest.mock('../src/services/OrderService', () => ({
    createOrder: jest.fn(),
}))

const OrderService = require('../src/services/OrderService')

const app = createApp()

const USER_ID = '6512c1f2a1b2c3d4e5f6aaaa'
const signToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
const authHeader = `Bearer ${signToken({ id: USER_ID, isAdmin: false })}`

beforeEach(() => {
    jest.clearAllMocks()
    OrderService.createOrder.mockResolvedValue({ status: 'OK', message: 'success' })
})

describe('POST /api/order/create/:id validation', () => {
    it('accepts a request with no client-supplied price fields at all', async () => {
        const res = await request(app)
            .post(`/api/order/create/${USER_ID}`)
            .set('token', authHeader)
            .send({
                orderItems: [{ product: 'prod-1', amount: 1, name: 'Widget' }],
                paymentMethod: 'later_money',
                fullName: 'Jane Doe',
                address: '123 Main St',
                city: 'Metropolis',
                phone: 5551234567,
                user: USER_ID,
            })

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('OK')
        expect(OrderService.createOrder).toHaveBeenCalledTimes(1)
    })

    it('still rejects a request missing required shipping/payment fields', async () => {
        const res = await request(app)
            .post(`/api/order/create/${USER_ID}`)
            .set('token', authHeader)
            .send({
                orderItems: [{ product: 'prod-1', amount: 1, name: 'Widget' }],
                paymentMethod: 'later_money',
                // missing fullName/address/city/phone
            })

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('ERR')
        expect(OrderService.createOrder).not.toHaveBeenCalled()
    })

    it('rejects a request with an empty orderItems array', async () => {
        const res = await request(app)
            .post(`/api/order/create/${USER_ID}`)
            .set('token', authHeader)
            .send({
                orderItems: [],
                paymentMethod: 'later_money',
                fullName: 'Jane Doe',
                address: '123 Main St',
                city: 'Metropolis',
                phone: 5551234567,
            })

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('ERR')
        expect(OrderService.createOrder).not.toHaveBeenCalled()
    })
})
