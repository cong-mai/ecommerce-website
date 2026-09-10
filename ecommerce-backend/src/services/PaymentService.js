const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com'

const getAccessToken = async () => {
    const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')
    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(`PayPal OAuth failed: ${JSON.stringify(data)}`)
    }
    return data.access_token
}

// Creates a PayPal order for exactly `totalPrice` - the caller must always
// pass a server-computed amount, never a client-supplied one.
const createOrder = async (totalPrice, currency = 'USD') => {
    const accessToken = await getAccessToken()
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: totalPrice.toFixed(2),
                },
            }],
        }),
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(`PayPal create order failed: ${JSON.stringify(data)}`)
    }
    return data
}

const captureOrder = async (paypalOrderId) => {
    const accessToken = await getAccessToken()
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(`PayPal capture failed: ${JSON.stringify(data)}`)
    }
    return data
}

const refundCapture = async (captureId) => {
    const accessToken = await getAccessToken()
    const response = await fetch(`${PAYPAL_API_BASE}/v2/payments/captures/${captureId}/refund`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
        throw new Error(`PayPal refund failed: ${JSON.stringify(data)}`)
    }
    return data
}

// Pulls the {status, captureId, amount} that matter out of a PayPal
// capture response, whatever the exact response shape ends up being.
const extractCaptureResult = (captureResponse) => {
    const capture = captureResponse?.purchase_units?.[0]?.payments?.captures?.[0]
    return {
        status: captureResponse?.status,
        captureId: capture?.id || null,
        amount: capture?.amount?.value !== undefined ? Number(capture.amount.value) : null,
    }
}

module.exports = {
    getAccessToken,
    createOrder,
    captureOrder,
    refundCapture,
    extractCaptureResult,
}
