import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SupportLayout, { Body } from '../../components/SupportLayout/SupportLayout'
import { Form, Input, SubmitButton, Hint, ErrorText, SignInPanel, SignInText, SignInButton } from './style'

const navLinks = [
    { to: '/support/how-to-order', label: 'How to order' },
    { to: '/support/return-policy', label: 'Return policy' },
    { to: '/support/contact-us', label: 'Contact us' },
    { to: '/support/help-center', label: 'Help center' },
]

const TrackOrderPage = () => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [orderId, setOrderId] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = orderId.trim()
        if (!trimmed) {
            setError('Enter your order number to continue.')
            return
        }
        setError('')
        navigate(`/details-order/${trimmed}`, { state: { token: user?.access_token } })
    }

    return (
        <SupportLayout
            backTo="/support"
            backLabel="← Customer support"
            title="Track my order"
            intro="Enter your order number to see its current status."
            navLinks={navLinks}
        >
            {user?.access_token ? (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            placeholder="e.g. 65f1a2b3c4d5e6f7a8b9c0d1"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            aria-label="Order number"
                        />
                        <SubmitButton type="submit">Track order</SubmitButton>
                    </Form>
                    {error && <ErrorText>{error}</ErrorText>}
                    <Hint>
                        Your order number is on the confirmation page and in your order history under{' '}
                        <a href="/my-order">My orders</a>.
                    </Hint>
                </>
            ) : (
                <SignInPanel>
                    <SignInText>
                        Sign in to track an order - we match orders to your account to keep them private.
                    </SignInText>
                    <SignInButton onClick={() => navigate('/sign-in')}>Sign in</SignInButton>
                </SignInPanel>
            )}

            <Body style={{ marginTop: '32px' }}>
                <p>
                    Once you're signed in, every order you've placed also appears automatically under{' '}
                    <a href="/my-order">My orders</a> - you don't need the order number to find it there.
                </p>
            </Body>
        </SupportLayout>
    )
}

export default TrackOrderPage
