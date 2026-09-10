const request = require('supertest')
const jwt = require('jsonwebtoken')
const createApp = require('../src/app')

jest.mock('../src/services/OrderService', () => ({
    getOrderDetails: jest.fn(),
}))

const OrderService = require('../src/services/OrderService')

const app = createApp()

const ORDER_ID = '6512c1f2a1b2c3d4e5f60001'
const OWNER_USER_ID = '6512c1f2a1b2c3d4e5f6aaaa'
const OTHER_USER_ID = '6512c1f2a1b2c3d4e5f6bbbb'

const orderRecord = {
    status: 'OK',
    message: 'SUCESSS',
    data: {
        _id: ORDER_ID,
        user: OWNER_USER_ID,
        itemsPrice: 100,
        totalPrice: 110,
    },
}

const signToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

beforeEach(() => {
    jest.clearAllMocks()
    OrderService.getOrderDetails.mockResolvedValue(orderRecord)
})

describe('GET /api/order/get-details-order/:id auth', () => {
    it('rejects a request with no token and never looks up the order', async () => {
        const res = await request(app).get(`/api/order/get-details-order/${ORDER_ID}`)

        expect(res.status).toBe(404)
        expect(res.body.status).toBe('ERROR')
        expect(OrderService.getOrderDetails).not.toHaveBeenCalled()
    })

    it('rejects a valid token belonging to a different (non-owner, non-admin) user', async () => {
        const token = signToken({ id: OTHER_USER_ID, isAdmin: false })

        const res = await request(app)
            .get(`/api/order/get-details-order/${ORDER_ID}`)
            .set('token', `Bearer ${token}`)

        expect(res.status).toBe(404)
        expect(res.body.status).toBe('ERROR')
    })

    it('allows the order owner to view their own order', async () => {
        const token = signToken({ id: OWNER_USER_ID, isAdmin: false })

        const res = await request(app)
            .get(`/api/order/get-details-order/${ORDER_ID}`)
            .set('token', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('OK')
        expect(res.body.data.user).toBe(OWNER_USER_ID)
    })

    it('allows an admin to view an order that is not theirs', async () => {
        const token = signToken({ id: OTHER_USER_ID, isAdmin: true })

        const res = await request(app)
            .get(`/api/order/get-details-order/${ORDER_ID}`)
            .set('token', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('OK')
    })
})
