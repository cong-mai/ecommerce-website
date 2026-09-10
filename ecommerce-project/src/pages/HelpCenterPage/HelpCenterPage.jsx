import React from 'react'
import { Link } from 'react-router-dom'
import SupportLayout, { Section, SectionTitle, Body } from '../../components/SupportLayout/SupportLayout'

const sections = [
    { id: 'orders', label: 'Orders & shipping' },
    { id: 'payments', label: 'Payments' },
    { id: 'returns', label: 'Returns & refunds' },
    { id: 'account', label: 'Account & sign-in' },
    { id: 'stock', label: 'Product & stock' },
]

const HelpCenterPage = () => {
    return (
        <SupportLayout
            backTo="/support"
            backLabel="← Customer support"
            title="Help center"
            intro="Answers to the questions we hear most. If yours isn't here, contact us directly."
            sections={sections}
        >
            <Section id="orders">
                <SectionTitle>Orders & shipping</SectionTitle>
                <Body>
                    <p>
                        Once you place an order, you'll see it under <Link to="/my-order">My orders</Link> right
                        away. Delivery fees are based on your order subtotal: orders under $20 ship for $20,
                        orders from $20–$49.99 ship for $10, and orders of $50 or more ship free.
                    </p>
                    <p>
                        Need the status of a specific order? Head to <Link to="/support/track-order">Track my order</Link>.
                    </p>
                </Body>
            </Section>

            <Section id="payments">
                <SectionTitle>Payments</SectionTitle>
                <Body>
                    <p>We currently accept two payment methods at checkout:</p>
                    <ul>
                        <li><strong>Cash on delivery</strong> - pay when your order arrives.</li>
                        <li><strong>PayPal</strong> - pay securely online; your order is placed as soon as the payment is confirmed.</li>
                    </ul>
                    <p>
                        Your card or PayPal details are never stored on our servers - payment is handled entirely
                        by PayPal.
                    </p>
                </Body>
            </Section>

            <Section id="returns">
                <SectionTitle>Returns & refunds</SectionTitle>
                <Body>
                    <p>
                        Most items can be returned within 14 days of delivery. See the full{' '}
                        <Link to="/support/return-policy">return policy</Link> for eligibility and how refunds
                        are issued.
                    </p>
                </Body>
            </Section>

            <Section id="account">
                <SectionTitle>Account & sign-in</SectionTitle>
                <Body>
                    <p>
                        You'll need an account to check out, so we can keep your order history and shipping
                        details in one place. If you're signed out unexpectedly, just sign back in - your cart
                        is saved.
                    </p>
                    <p>
                        Update your name, address, or phone number any time from your account details before
                        checkout.
                    </p>
                </Body>
            </Section>

            <Section id="stock">
                <SectionTitle>Product & stock</SectionTitle>
                <Body>
                    <p>
                        Stock counts update the moment an order is placed, so what you see on a product page is
                        accurate in real time. If an item sells out between adding it to your cart and checking
                        out, we'll tell you exactly which one before you pay - nothing is charged for items we
                        can't fulfill.
                    </p>
                </Body>
            </Section>
        </SupportLayout>
    )
}

export default HelpCenterPage
