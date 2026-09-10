import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockDispatch = jest.fn()
const mockNavigate = jest.fn()

const mockUser = {
    id: 'user-1',
    access_token: 'access-token-abc',
    name: 'Jane Doe',
    address: '123 Main St',
    phone: 5551234567,
    city: 'Metropolis',
    email: 'jane@example.com',
}

const mockOrderItems = [{ product: 'prod-1', amount: 1, price: 50, name: 'Widget', discount: 0 }]

const mockState = {
    user: mockUser,
    order: { orderItemsSlected: mockOrderItems },
}

jest.mock('react-redux', () => ({
    useSelector: (selector) => selector(mockState),
    useDispatch: () => mockDispatch,
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

jest.mock('../../services/OrderService', () => ({
    createOrder: jest.fn(),
    createPaypalOrder: jest.fn(),
    capturePaypalOrder: jest.fn(),
}))

jest.mock('../../services/PaymentService', () => ({
    getConfig: jest.fn(),
}))

jest.mock('../../components/Message/Message', () => ({
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
}))

jest.mock('@paypal/react-paypal-js', () => ({
    PayPalScriptProvider: ({ children }) => <div data-testid="paypal-script-provider">{children}</div>,
    PayPalButtons: (props) => {
        global.__lastPaypalButtonsProps = props
        return <div data-testid="paypal-buttons" />
    },
}))

const OrderService = require('../../services/OrderService')
const PaymentService = require('../../services/PaymentService')
const message = require('../../components/Message/Message')
const PaymentPage = require('./PaymentPage').default

const renderPage = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    })
    return render(
        <QueryClientProvider client={queryClient}>
            <PaymentPage />
        </QueryClientProvider>
    )
}

const switchToPaypal = async () => {
    await userEvent.click(screen.getByRole('radio', { name: /pay with paypal/i }))
    await waitFor(() => expect(global.__lastPaypalButtonsProps).toBeTruthy())
}

beforeEach(() => {
    jest.clearAllMocks()
    global.__lastPaypalButtonsProps = null
    PaymentService.getConfig.mockResolvedValue({ data: 'sandbox-client-id' })
})

describe('PaymentPage PayPal flow', () => {
    it('asks the backend to create the PayPal order and returns its paypalOrderId — no price is sent to PayPal from the client', async () => {
        OrderService.createPaypalOrder.mockResolvedValue({ status: 'OK', paypalOrderId: 'PAYPAL-1' })
        renderPage()
        await switchToPaypal()

        const orderId = await global.__lastPaypalButtonsProps.createOrder()

        expect(orderId).toBe('PAYPAL-1')
        expect(OrderService.createPaypalOrder).toHaveBeenCalledWith(
            { orderItems: mockOrderItems, user: mockUser.id },
            mockUser.access_token
        )
    })

    it('surfaces the error and rejects when the server refuses to create the PayPal order', async () => {
        OrderService.createPaypalOrder.mockResolvedValue({ status: 'ERR', message: 'Product Widget is not available' })
        renderPage()
        await switchToPaypal()

        await expect(global.__lastPaypalButtonsProps.createOrder()).rejects.toThrow('Product Widget is not available')
        expect(message.error).toHaveBeenCalledWith('Product Widget is not available')
    })

    it('captures the payment on approval and completes the order when the server confirms it', async () => {
        OrderService.capturePaypalOrder.mockResolvedValue({ status: 'OK', message: 'success' })
        renderPage()
        await switchToPaypal()

        await global.__lastPaypalButtonsProps.onApprove({ orderID: 'PAYPAL-1' })

        expect(OrderService.capturePaypalOrder).toHaveBeenCalledWith(
            expect.objectContaining({
                paypalOrderId: 'PAYPAL-1',
                orderItems: mockOrderItems,
                fullName: mockUser.name,
                address: mockUser.address,
                city: mockUser.city,
                phone: mockUser.phone,
                paymentMethod: 'paypal',
                user: mockUser.id,
                email: mockUser.email,
            }),
            mockUser.access_token
        )
        expect(mockDispatch).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/orderSuccess', expect.anything())
    })

    it('shows an error and does NOT complete the order when the server rejects the capture (e.g. amount mismatch, refunded)', async () => {
        OrderService.capturePaypalOrder.mockResolvedValue({
            status: 'ERR',
            message: 'Payment amount does not match the order total; payment has been refunded',
        })
        renderPage()
        await switchToPaypal()

        await global.__lastPaypalButtonsProps.onApprove({ orderID: 'PAYPAL-1' })

        expect(message.error).toHaveBeenCalledWith('Payment amount does not match the order total; payment has been refunded')
        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('shows a generic error if the capture request itself throws (e.g. network failure)', async () => {
        OrderService.capturePaypalOrder.mockRejectedValue(new Error('network down'))
        renderPage()
        await switchToPaypal()

        await global.__lastPaypalButtonsProps.onApprove({ orderID: 'PAYPAL-1' })

        expect(message.error).toHaveBeenCalledWith('Something went wrong finalizing your PayPal payment')
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})

describe('PaymentPage COD flow (regression check on the shared success handler)', () => {
    it('still places a COD order and navigates to orderSuccess on success', async () => {
        OrderService.createOrder.mockResolvedValue({ status: 'OK' })
        renderPage()

        await userEvent.click(screen.getByRole('button', { name: /place order/i }))

        await waitFor(() => expect(OrderService.createOrder).toHaveBeenCalled())
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/orderSuccess', expect.anything()))
        expect(mockDispatch).toHaveBeenCalled()
    })
})
