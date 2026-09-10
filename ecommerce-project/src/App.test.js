import React from 'react'
import { render, waitFor } from '@testing-library/react'

const mockDispatch = jest.fn()
const mockUserState = { isAdmin: false }

jest.mock('react-redux', () => ({
    useSelector: (selector) => selector({ user: mockUserState }),
    useDispatch: () => mockDispatch,
}))

// Keep the real axiosJWT instance (so its interceptor manager is real and
// inspectable) but stub out the network-calling functions.
jest.mock('./services/UserService', () => {
    const actual = jest.requireActual('./services/UserService')
    return {
        ...actual,
        refreshToken: jest.fn(),
        getDetailsUser: jest.fn(),
    }
})

// App renders the whole page tree under whatever route matches "/" - swap
// in a trivial stub so this test only exercises App's own token/interceptor
// logic, not every page component's own data fetching.
jest.mock('./routes', () => {
    const React = require('react')
    return [
        { path: '/', page: () => React.createElement('div', { 'data-testid': 'stub-page' }, 'stub'), isShowHeader: false },
    ]
})

const UserService = require('./services/UserService')
const App = require('./App').default

const base64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const makeFakeJwt = (payload) => `${base64url({ alg: 'none', typ: 'JWT' })}.${base64url(payload)}.signature`

const nowSeconds = () => Math.floor(Date.now() / 1000)

const setStoredAccessToken = (payload) => {
    localStorage.setItem('access_token', JSON.stringify(makeFakeJwt(payload)))
}

const getActiveInterceptorHandlers = () =>
    UserService.axiosJWT.interceptors.request.handlers.filter(Boolean)

beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    UserService.getDetailsUser.mockResolvedValue({ data: {} })
})

describe('App request interceptor lifecycle', () => {
    it('registers exactly one interceptor on mount and removes it on unmount', async () => {
        const { unmount } = render(<App />)
        await waitFor(() => expect(getActiveInterceptorHandlers().length).toBe(1))

        unmount()

        expect(getActiveInterceptorHandlers().length).toBe(0)
    })

    it('does not accumulate duplicate interceptors when the component re-renders', async () => {
        const { rerender, unmount } = render(<App />)
        await waitFor(() => expect(getActiveInterceptorHandlers().length).toBe(1))

        rerender(<App />)
        rerender(<App />)
        rerender(<App />)

        expect(getActiveInterceptorHandlers().length).toBe(1)
        unmount()
    })
})

describe('App request interceptor behavior', () => {
    const runInterceptor = async (config = { headers: {} }) => {
        const [{ fulfilled }] = getActiveInterceptorHandlers()
        return fulfilled(config)
    }

    it('leaves the request unchanged when the stored access token is not expired', async () => {
        setStoredAccessToken({ id: 'user-1', exp: nowSeconds() + 3600 })
        const { unmount } = render(<App />)
        await waitFor(() => expect(getActiveInterceptorHandlers().length).toBe(1))

        const result = await runInterceptor({ headers: {} })

        expect(UserService.refreshToken).not.toHaveBeenCalled()
        expect(result.headers.token).toBeUndefined()
        unmount()
    })

    it('refreshes the access token via the cookie-based endpoint when the stored one is expired', async () => {
        setStoredAccessToken({ id: 'user-1', exp: nowSeconds() - 3600 })
        UserService.refreshToken.mockResolvedValue({ status: 'OK', access_token: 'NEW-ACCESS-TOKEN' })
        const { unmount } = render(<App />)
        await waitFor(() => expect(getActiveInterceptorHandlers().length).toBe(1))

        const result = await runInterceptor({ headers: {} })

        expect(UserService.refreshToken).toHaveBeenCalledWith()
        expect(result.headers.token).toBe('Bearer NEW-ACCESS-TOKEN')
        expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining('resetUser') }))
        unmount()
    })

    it('logs the user out when the refresh endpoint reports failure', async () => {
        setStoredAccessToken({ id: 'user-1', exp: nowSeconds() - 3600 })
        UserService.refreshToken.mockResolvedValue({ status: 'ERR', message: 'refresh token expired' })
        const { unmount } = render(<App />)
        await waitFor(() => expect(getActiveInterceptorHandlers().length).toBe(1))

        await runInterceptor({ headers: {} })

        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining('resetUser') }))
        unmount()
    })

    it('logs the user out when the refresh request itself throws', async () => {
        setStoredAccessToken({ id: 'user-1', exp: nowSeconds() - 3600 })
        UserService.refreshToken.mockRejectedValue(new Error('network down'))
        const { unmount } = render(<App />)
        await waitFor(() => expect(getActiveInterceptorHandlers().length).toBe(1))

        await runInterceptor({ headers: {} })

        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining('resetUser') }))
        unmount()
    })
})
