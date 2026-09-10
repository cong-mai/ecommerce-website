import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

const mockDispatch = jest.fn()
const mockNavigate = jest.fn()

const mockUser = {
    id: 'user-1',
    email: 'jane@example.com',
    name: 'Jane Doe',
    access_token: 'access-token-abc',
    isAdmin: false,
}

const mockState = {
    user: mockUser,
    order: { orderItems: [] },
}

jest.mock('react-redux', () => ({
    useSelector: (selector) => selector(mockState),
    useDispatch: () => mockDispatch,
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

jest.mock('../../services/UserService', () => ({
    logoutUser: jest.fn(),
}))

// antd's real Popover only renders `content` into the DOM once opened, and
// its positioning logic depends on browser APIs (ResizeObserver, etc.) that
// jsdom doesn't implement. None of that is what this test cares about — it
// just needs the "Sign out" item to be clickable — so render both children
// and content directly, unconditionally.
jest.mock('antd', () => {
    const actual = jest.requireActual('antd')
    return {
        ...actual,
        Popover: ({ children, content }) => (
            <div>
                {children}
                {content}
            </div>
        ),
    }
})

const UserService = require('../../services/UserService')
const HeaderComponent = require('./HeaderComponent').default

beforeEach(() => {
    jest.clearAllMocks()
    localStorage.setItem('access_token', JSON.stringify('some-access-token'))
    localStorage.setItem('refresh_token', JSON.stringify('some-stale-refresh-token'))
    UserService.logoutUser.mockResolvedValue({ status: 'Ok', message: 'Logout successfully' })
})

afterEach(() => {
    localStorage.clear()
})

describe('HeaderComponent logout', () => {
    it('clears both access_token and the stale refresh_token from localStorage on logout', async () => {
        render(<MemoryRouter><HeaderComponent /></MemoryRouter>)

        await userEvent.click(screen.getByText(/sign out/i))

        await waitFor(() => expect(UserService.logoutUser).toHaveBeenCalledTimes(1))

        expect(localStorage.getItem('access_token')).toBeNull()
        expect(localStorage.getItem('refresh_token')).toBeNull()
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining('resetUser') }))
    })
})
