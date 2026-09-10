const PaymentService = require('../src/services/PaymentService')

const jsonResponse = (body, ok = true, status = ok ? 200 : 400) => ({
    ok,
    status,
    json: async () => body,
})

beforeEach(() => {
    jest.resetAllMocks()
    global.fetch = jest.fn()
    process.env.CLIENT_ID = 'test-client-id'
    process.env.PAYPAL_CLIENT_SECRET = 'test-client-secret'
})

describe('PaymentService.getAccessToken', () => {
    it('requests an OAuth token using Basic auth of CLIENT_ID:PAYPAL_CLIENT_SECRET', async () => {
        global.fetch.mockResolvedValueOnce(jsonResponse({ access_token: 'token-123' }))

        const token = await PaymentService.getAccessToken()

        expect(token).toBe('token-123')
        const [url, options] = global.fetch.mock.calls[0]
        expect(url).toMatch(/\/v1\/oauth2\/token$/)
        const expectedAuth = `Basic ${Buffer.from('test-client-id:test-client-secret').toString('base64')}`
        expect(options.headers.Authorization).toBe(expectedAuth)
    })

    it('throws when PayPal rejects the OAuth request', async () => {
        global.fetch.mockResolvedValueOnce(jsonResponse({ error: 'invalid_client' }, false, 401))

        await expect(PaymentService.getAccessToken()).rejects.toThrow(/PayPal OAuth failed/)
    })
})

describe('PaymentService.createOrder', () => {
    it('creates a PayPal order for exactly the given amount', async () => {
        global.fetch
            .mockResolvedValueOnce(jsonResponse({ access_token: 'token-123' }))
            .mockResolvedValueOnce(jsonResponse({ id: 'PAYPAL-ORDER-1', status: 'CREATED' }))

        const order = await PaymentService.createOrder(59.99)

        expect(order.id).toBe('PAYPAL-ORDER-1')
        const [url, options] = global.fetch.mock.calls[1]
        expect(url).toMatch(/\/v2\/checkout\/orders$/)
        const body = JSON.parse(options.body)
        expect(body.purchase_units[0].amount.value).toBe('59.99')
        expect(body.purchase_units[0].amount.currency_code).toBe('USD')
    })

    it('throws when PayPal rejects order creation', async () => {
        global.fetch
            .mockResolvedValueOnce(jsonResponse({ access_token: 'token-123' }))
            .mockResolvedValueOnce(jsonResponse({ error: 'bad request' }, false, 400))

        await expect(PaymentService.createOrder(10)).rejects.toThrow(/PayPal create order failed/)
    })
})

describe('PaymentService.captureOrder', () => {
    it('posts to the capture endpoint for the given PayPal order id', async () => {
        global.fetch
            .mockResolvedValueOnce(jsonResponse({ access_token: 'token-123' }))
            .mockResolvedValueOnce(jsonResponse({ status: 'COMPLETED' }))

        const result = await PaymentService.captureOrder('PAYPAL-ORDER-1')

        expect(result.status).toBe('COMPLETED')
        const [url] = global.fetch.mock.calls[1]
        expect(url).toMatch(/\/v2\/checkout\/orders\/PAYPAL-ORDER-1\/capture$/)
    })
})

describe('PaymentService.refundCapture', () => {
    it('posts to the refund endpoint for the given capture id', async () => {
        global.fetch
            .mockResolvedValueOnce(jsonResponse({ access_token: 'token-123' }))
            .mockResolvedValueOnce(jsonResponse({ status: 'COMPLETED' }))

        await PaymentService.refundCapture('CAPTURE-1')

        const [url] = global.fetch.mock.calls[1]
        expect(url).toMatch(/\/v2\/payments\/captures\/CAPTURE-1\/refund$/)
    })
})

describe('PaymentService.extractCaptureResult', () => {
    it('pulls status/captureId/amount out of a realistic PayPal capture response', () => {
        const response = {
            status: 'COMPLETED',
            purchase_units: [{
                payments: {
                    captures: [{
                        id: 'CAPTURE-1',
                        amount: { value: '59.99', currency_code: 'USD' },
                    }],
                },
            }],
        }

        const result = PaymentService.extractCaptureResult(response)

        expect(result).toEqual({ status: 'COMPLETED', captureId: 'CAPTURE-1', amount: 59.99 })
    })

    it('returns nulls when the response is missing the expected shape', () => {
        const result = PaymentService.extractCaptureResult({ status: 'VOIDED' })

        expect(result).toEqual({ status: 'VOIDED', captureId: null, amount: null })
    })
})
