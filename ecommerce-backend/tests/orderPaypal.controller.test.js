const request = require('supertest')
const jwt = require('jsonwebtoken')
const createApp = require('../src/app')

jest.mock('../src/services/OrderService', () => ({
    createPaypalOrder: jest.fn(),
    capturePaypalOrder: jest.fn(),
}))

const OrderService = require('../src/services/OrderService')

const app = createApp()

const USER_ID = '6512c1f2a1b2c3d4e5f6aaaa'
const OTHER_USER_ID = '6512c1f2a1b2c3d4e5f6bbbb'
const signToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
const ownerAuthHeader = `Bearer ${signToken({ id: USER_ID, isAdmin: false })}`

beforeEach(() => {
    jest.clearAllMocks()
    OrderService.createPaypalOrder.mockResolvedValue({ status: 'OK', paypalOrderId: 'PAYPAL-1' })
    OrderService.capturePaypalOrder.mockResolvedValue({ status: 'OK', message: 'success' })
})

describe('POST /api/order/paypal/create/:id', () => {
    it('rejects requests without a token', async () => {
        const res = await request(app)
            .post(`/api/order/paypal/create/${USER_ID}`)
            .send({ orderItems: [{ product: 'prod-1', amount: 1 }] })

        expect(res.status).toBe(404)
        expect(OrderService.createPaypalOrder).not.toHaveBeenCalled()
    })

    it('rejects a token for a different (non-owner, non-admin) user', async () => {
        const token = signToken({ id: OTHER_USER_ID, isAdmin: false })

        const res = await request(app)
            .post(`/api/order/paypal/create/${USER_ID}`)
            .set('token', `Bearer ${token}`)
            .send({ orderItems: [{ product: 'prod-1', amount: 1 }] })

        expect(res.status).toBe(404)
        expect(OrderService.createPaypalOrder).not.toHaveBeenCalled()
    })

    it('rejects an empty cart', async () => {
        const res = await request(app)
            .post(`/api/order/paypal/create/${USER_ID}`)
            .set('token', ownerAuthHeader)
            .send({ orderItems: [] })

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('ERR')
        expect(OrderService.createPaypalOrder).not.toHaveBeenCalled()
    })

    it('creates the PayPal order for the owning user', async () => {
        const res = await request(app)
            .post(`/api/order/paypal/create/${USER_ID}`)
            .set('token', ownerAuthHeader)
            .send({ orderItems: [{ product: 'prod-1', amount: 1 }] })

        expect(res.status).toBe(200)
        expect(res.body.paypalOrderId).toBe('PAYPAL-1')
    })
})

describe('POST /api/order/paypal/capture/:id', () => {
    const validCaptureBody = {
        paypalOrderId: 'PAYPAL-1',
        orderItems: [{ product: 'prod-1', amount: 1 }],
        paymentMethod: 'paypal',
        fullName: 'Jane Doe',
        address: '123 Main St',
        city: 'Metropolis',
        phone: 5551234567,
    }

    it('rejects requests without a token', async () => {
        const res = await request(app)
            .post(`/api/order/paypal/capture/${USER_ID}`)
            .send(validCaptureBody)

        expect(res.status).toBe(404)
        expect(OrderService.capturePaypalOrder).not.toHaveBeenCalled()
    })

    it('rejects a request missing the paypalOrderId', async () => {
        const { paypalOrderId, ...rest } = validCaptureBody

        const res = await request(app)
            .post(`/api/order/paypal/capture/${USER_ID}`)
            .set('token', ownerAuthHeader)
            .send(rest)

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('ERR')
        expect(OrderService.capturePaypalOrder).not.toHaveBeenCalled()
    })

    it('captures the order for the owning user', async () => {
        const res = await request(app)
            .post(`/api/order/paypal/capture/${USER_ID}`)
            .set('token', ownerAuthHeader)
            .send(validCaptureBody)

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('OK')
        expect(OrderService.capturePaypalOrder).toHaveBeenCalledWith('PAYPAL-1', expect.objectContaining(validCaptureBody))
    })
})
