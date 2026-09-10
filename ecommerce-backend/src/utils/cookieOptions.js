// Frontend and backend are deployed on different origins, so the refresh
// token cookie needs sameSite:'none' + secure:true in production for the
// browser to send it back at all on a cross-site request. Locally,
// frontend/backend just differ by port on localhost (same site), so
// sameSite:'lax' + secure:false works and doesn't require HTTPS.
const getRefreshTokenCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production'
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
    }
}

module.exports = { getRefreshTokenCookieOptions }
