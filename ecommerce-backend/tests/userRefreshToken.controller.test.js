const request = require('supertest')
const createApp = require('../src/app')

jest.mock('../src/services/JwtService', () => ({
    refreshTokenJwtService: jest.fn(),
}))

const JwtService = require('../src/services/JwtService')

const app = createApp()

beforeEach(() => {
    jest.clearAllMocks()
})

describe('POST /api/user/refresh-token', () => {
    it('rejects when no refresh_token cookie is present', async () => {
        const res = await request(app).post('/api/user/refresh-token')

        expect(res.body.status).toBe('ERR')
        expect(JwtService.refreshTokenJwtService).not.toHaveBeenCalled()
    })

    it('ignores a legacy Authorization-style token header - only the cookie counts', async () => {
        const res = await request(app)
            .post('/api/user/refresh-token')
            .set('token', 'Bearer some-legacy-refresh-token')

        expect(res.body.status).toBe('ERR')
        expect(JwtService.refreshTokenJwtService).not.toHaveBeenCalled()
    })

    it('issues a new access token using the refresh_token cookie', async () => {
        JwtService.refreshTokenJwtService.mockResolvedValue({
            status: 'OK',
            message: 'SUCESS',
            access_token: 'NEW-ACCESS-1',
        })

        const res = await request(app)
            .post('/api/user/refresh-token')
            .set('Cookie', ['refresh_token=COOKIE-REFRESH-1'])

        expect(res.body.status).toBe('OK')
        expect(res.body.access_token).toBe('NEW-ACCESS-1')
        expect(JwtService.refreshTokenJwtService).toHaveBeenCalledWith('COOKIE-REFRESH-1')
    })
})
