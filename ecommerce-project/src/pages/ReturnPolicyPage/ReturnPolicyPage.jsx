import React from 'react'
import { Link } from 'react-router-dom'
import SupportLayout, { Section, SectionTitle, Body } from '../../components/SupportLayout/SupportLayout'

const sections = [
    { id: 'window', label: 'Return window' },
    { id: 'eligibility', label: 'What qualifies' },
    { id: 'process', label: 'How to start a return' },
    { id: 'refunds', label: 'Refunds' },
    { id: 'exchanges', label: 'Exchanges' },
]

const ReturnPolicyPage = () => {
    return (
        <SupportLayout
            backTo="/support"
            backLabel="← Customer support"
            title="Return policy"
            intro="If something isn't right, we want to make it easy to send back."
            sections={sections}
        >
            <Section id="window">
                <SectionTitle>Return window</SectionTitle>
                <Body>
                    <p>
                        You can return most items within <strong>14 days</strong> of delivery. The 14 days start
                        the day your order is marked delivered.
                    </p>
                </Body>
            </Section>

            <Section id="eligibility">
                <SectionTitle>What qualifies</SectionTitle>
                <Body>
                    <p>To be eligible for a return, an item should be:</p>
                    <ul>
                        <li>Unused and in the condition you received it</li>
                        <li>In its original packaging, with all accessories and cables included</li>
                        <li>Free of physical damage not present on delivery</li>
                    </ul>
                    <p>
                        Cash-on-delivery orders that were never accepted at the door don't need a return - those
                        are simply cancelled automatically.
                    </p>
                </Body>
            </Section>

            <Section id="process">
                <SectionTitle>How to start a return</SectionTitle>
                <Body>
                    <p>
                        Open <Link to="/my-order">My orders</Link>, find the order, and choose <strong>Cancel
                            order</strong> if it hasn't shipped yet. If it's already arrived, contact us through{' '}
                        <Link to="/support/contact-us">Contact us</Link> with your order number and we'll arrange
                        collection.
                    </p>
                </Body>
            </Section>

            <Section id="refunds">
                <SectionTitle>Refunds</SectionTitle>
                <Body>
                    <p>
                        Once we've received and checked a returned item, we issue your refund to the original
                        payment method - PayPal refunds are typically instant on our side, and cash-on-delivery
                        refunds are processed by bank transfer.
                    </p>
                    <p>Shipping fees are refunded only when the return is due to our error (wrong or faulty item).</p>
                </Body>
            </Section>

            <Section id="exchanges">
                <SectionTitle>Exchanges</SectionTitle>
                <Body>
                    <p>
                        We don't process direct exchanges. Return the original item for a refund, then place a
                        new order for the item you'd like instead - it's faster than waiting on a swap.
                    </p>
                </Body>
            </Section>
        </SupportLayout>
    )
}

export default ReturnPolicyPage
