const request = require('supertest')
const jwt = require('jsonwebtoken')
const createApp = require('../src/app')

jest.mock('../src/services/EmbeddingService', () => ({
    generateEmbedding: jest.fn().mockRejectedValue(new Error('embedding disabled in tests')),
    generateEmbeddingsBatch: jest.fn(),
    cosineSimilarity: jest.fn(),
}))

jest.mock('../src/models/ProductModel', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}))

const Product = require('../src/models/ProductModel')

const app = createApp()

const validProductPayload = {
    name: 'Test Phone',
    image: 'http://example.com/img.jpg',
    type: 'Phone',
    countInStock: 10,
    price: 500,
    rating: 5,
    description: 'A phone',
    discount: 5,
}

const signToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

beforeEach(() => {
    jest.clearAllMocks()
    Product.findOne.mockResolvedValue(null)
    Product.create.mockResolvedValue({ _id: 'new-product-id', ...validProductPayload })
})

describe('POST /api/product/create auth', () => {
    it('rejects a request with no token header at all and never touches the Product model', async () => {
        const res = await request(app)
            .post('/api/product/create')
            .send(validProductPayload)

        expect(res.status).toBe(404)
        expect(res.body.status).toBe('ERROR')
        expect(Product.create).not.toHaveBeenCalled()
    })

    it('rejects an invalid/garbage token and never touches the Product model', async () => {
        const res = await request(app)
            .post('/api/product/create')
            .set('token', 'Bearer not-a-real-token')
            .send(validProductPayload)

        expect(res.status).toBe(404)
        expect(res.body.status).toBe('ERROR')
        expect(Product.create).not.toHaveBeenCalled()
    })

    it('rejects a valid token belonging to a non-admin user and never touches the Product model', async () => {
        const token = signToken({ id: 'regular-user-id', isAdmin: false })

        const res = await request(app)
            .post('/api/product/create')
            .set('token', `Bearer ${token}`)
            .send(validProductPayload)

        expect(res.status).toBe(404)
        expect(res.body.status).toBe('ERROR')
        expect(Product.create).not.toHaveBeenCalled()
    })

    it('allows a valid admin token to create the product', async () => {
        const token = signToken({ id: 'admin-user-id', isAdmin: true })

        const res = await request(app)
            .post('/api/product/create')
            .set('token', `Bearer ${token}`)
            .send(validProductPayload)

        expect(res.status).toBe(200)
        expect(res.body.status).toBe('OK')
        expect(Product.create).toHaveBeenCalledTimes(1)
        expect(Product.create).toHaveBeenCalledWith(
            expect.objectContaining({ name: validProductPayload.name })
        )
    })
})
