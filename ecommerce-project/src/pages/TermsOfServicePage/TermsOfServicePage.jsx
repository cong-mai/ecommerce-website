import React from 'react'
import { Link } from 'react-router-dom'
import SupportLayout, { Section, SectionTitle, Body } from '../../components/SupportLayout/SupportLayout'

const sections = [
    { id: 'account', label: 'Your account' },
    { id: 'orders', label: 'Orders & pricing' },
    { id: 'payment', label: 'Payment' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'returns', label: 'Returns' },
    { id: 'liability', label: 'Liability' },
    { id: 'changes', label: 'Changes to these terms' },
]

const TermsOfServicePage = () => {
    return (
        <SupportLayout
            title="Terms of service"
            intro="The plain-language rules for buying from Cong Mai."
            sections={sections}
        >
            <Section id="account">
                <SectionTitle>Your account</SectionTitle>
                <Body>
                    <p>
                        You need an account to place an order. Keep your password to yourself, and keep your
                        contact details accurate - we use them to deliver your order and reach you if there's a
                        problem with it.
                    </p>
                </Body>
            </Section>

            <Section id="orders">
                <SectionTitle>Orders & pricing</SectionTitle>
                <Body>
                    <p>
                        Prices and stock are shown as accurately as we can manage in real time, but occasionally
                        a price changes or an item sells out between browsing and checkout. If that happens to
                        an item in your order, we'll tell you before anything is charged - we never bill for an
                        item we can't fulfill.
                    </p>
                </Body>
            </Section>

            <Section id="payment">
                <SectionTitle>Payment</SectionTitle>
                <Body>
                    <p>
                        You can pay by cash on delivery or by PayPal. If you pay by PayPal, your order is placed
                        once the payment is confirmed as complete; if a payment doesn't go through, no order is
                        created.
                    </p>
                </Body>
            </Section>

            <Section id="delivery">
                <SectionTitle>Delivery</SectionTitle>
                <Body>
                    <p>
                        Delivery fees are based on your order subtotal: under $20 ships for $20, $20–$49.99 ships
                        for $10, and $50 or more ships free. Delivery times vary by location and are estimates,
                        not guarantees.
                    </p>
                </Body>
            </Section>

            <Section id="returns">
                <SectionTitle>Returns</SectionTitle>
                <Body>
                    <p>
                        Returns are accepted within 14 days of delivery under the terms of our{' '}
                        <Link to="/support/return-policy">return policy</Link>.
                    </p>
                </Body>
            </Section>

            <Section id="liability">
                <SectionTitle>Liability</SectionTitle>
                <Body>
                    <p>
                        We're responsible for getting you the item you ordered, in the condition described, or
                        making it right if we don't. We're not responsible for indirect losses - like lost data
                        on a device you bought from us - beyond repairing, replacing, or refunding the product
                        itself.
                    </p>
                </Body>
            </Section>

            <Section id="changes">
                <SectionTitle>Changes to these terms</SectionTitle>
                <Body>
                    <p>
                        If we change these terms in a way that affects an order you've already placed, that
                        order is still governed by the terms in place when you placed it.
                    </p>
                </Body>
            </Section>
        </SupportLayout>
    )
}

export default TermsOfServicePage
