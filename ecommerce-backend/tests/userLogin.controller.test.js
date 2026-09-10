const request = require('supertest')
const createApp = require('../src/app')

jest.mock('../src/services/UserService', () => ({
    loginUser: jest.fn(),
}))

const UserService = require('../src/services/UserService')

const app = createApp()
const originalEnv = process.env.NODE_ENV

afterEach(() => {
    process.env.NODE_ENV = originalEnv
    jest.clearAllMocks()
})

describe('POST /api/user/sign-in', () => {
    it('sets the refresh token only as an httpOnly cookie, never in the JSON response body', async () => {
        UserService.loginUser.mockResolvedValue({
            status: 'OK',
            message: 'SUCCESS',
            access_token: 'ACCESS-1',
            refresh_token: 'REFRESH-1',
        })

        const res = await request(app)
            .post('/api/user/sign-in')
            .send({ email: 'jane@example.com', password: 'secret123' })

        expect(res.body.access_token).toBe('ACCESS-1')
        expect(res.body.refresh_token).toBeUndefined()

        const cookies = res.headers['set-cookie'] || []
        const refreshCookie = cookies.find((c) => c.startsWith('refresh_token='))
        expect(refreshCookie).toBeDefined()
        expect(refreshCookie).toContain('REFRESH-1')
        expect(refreshCookie).toMatch(/HttpOnly/i)
    })

    it('marks the cookie Secure and SameSite=None in production (cross-site frontend/backend)', async () => {
        process.env.NODE_ENV = 'production'
        UserService.loginUser.mockResolvedValue({
            status: 'OK',
            message: 'SUCCESS',
            access_token: 'ACCESS-1',
            refresh_token: 'REFRESH-1',
        })

        const res = await request(app)
            .post('/api/user/sign-in')
            .send({ email: 'jane@example.com', password: 'secret123' })

        const cookies = res.headers['set-cookie'] || []
        const refreshCookie = cookies.find((c) => c.startsWith('refresh_token='))
        expect(refreshCookie).toMatch(/Secure/i)
        expect(refreshCookie).toMatch(/SameSite=None/i)
    })

    it('does not set any cookie when login fails', async () => {
        UserService.loginUser.mockResolvedValue({
            status: 'ERR',
            message: 'The password or user is incorrect',
        })

        const res = await request(app)
            .post('/api/user/sign-in')
            .send({ email: 'jane@example.com', password: 'wrong' })

        expect(res.body.status).toBe('ERR')
        expect(res.headers['set-cookie']).toBeUndefined()
    })
})
