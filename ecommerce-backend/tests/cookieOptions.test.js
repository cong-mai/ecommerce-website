const { getRefreshTokenCookieOptions } = require('../src/utils/cookieOptions')

describe('getRefreshTokenCookieOptions', () => {
    const originalEnv = process.env.NODE_ENV

    afterEach(() => {
        process.env.NODE_ENV = originalEnv
    })

    it('uses secure:true and sameSite:"none" in production (needed for the cross-site frontend/backend split)', () => {
        process.env.NODE_ENV = 'production'

        const options = getRefreshTokenCookieOptions()

        expect(options).toEqual({
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        })
    })

    it('uses secure:false and sameSite:"lax" outside production (localhost has no HTTPS)', () => {
        process.env.NODE_ENV = 'development'

        const options = getRefreshTokenCookieOptions()

        expect(options).toEqual({
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
        })
    })

    it('always sets httpOnly:true regardless of environment', () => {
        process.env.NODE_ENV = 'test'
        expect(getRefreshTokenCookieOptions().httpOnly).toBe(true)

        process.env.NODE_ENV = 'production'
        expect(getRefreshTokenCookieOptions().httpOnly).toBe(true)
    })
})
