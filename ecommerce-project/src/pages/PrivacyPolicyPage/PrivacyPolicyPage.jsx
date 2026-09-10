import React from 'react'
import SupportLayout, { Section, SectionTitle, Body } from '../../components/SupportLayout/SupportLayout'

const sections = [
    { id: 'collect', label: 'What we collect' },
    { id: 'use', label: 'How we use it' },
    { id: 'cookies', label: 'Cookies & sign-in' },
    { id: 'third-parties', label: 'Third parties' },
    { id: 'rights', label: 'Your rights' },
    { id: 'contact', label: 'Contact' },
]

const PrivacyPolicyPage = () => {
    return (
        <SupportLayout
            title="Privacy policy"
            intro="What we collect, why, and what we don't do with it. Last updated when this page shipped."
            sections={sections}
        >
            <Section id="collect">
                <SectionTitle>What we collect</SectionTitle>
                <Body>
                    <p>To create an account and place orders, we collect your name, email address, phone number,
                        delivery address, and city. We also keep a record of the orders you place - items, prices,
                        and delivery status - so you and our support team can look them up later.</p>
                    <p>We never see or store your full card or PayPal details - those are handled directly by
                        PayPal when you choose to pay that way.</p>
                </Body>
            </Section>

            <Section id="use">
                <SectionTitle>How we use it</SectionTitle>
                <Body>
                    <p>Your information is used to:</p>
                    <ul>
                        <li>Create and manage your account</li>
                        <li>Process and deliver your orders</li>
                        <li>Contact you about an order, if needed</li>
                        <li>Respond when you contact support</li>
                    </ul>
                    <p>We don't use your data for advertising, and we don't sell it to anyone.</p>
                </Body>
            </Section>

            <Section id="cookies">
                <SectionTitle>Cookies & sign-in</SectionTitle>
                <Body>
                    <p>
                        Staying signed in relies on two small pieces of data: a short-lived access token kept in
                        your browser, and a longer-lived sign-in cookie marked <em>HttpOnly</em>, meaning no
                        script on this site (or any other) can read it - only your browser and our server
                        exchange it directly.
                    </p>
                    <p>Signing out clears both. We don't use tracking or advertising cookies.</p>
                </Body>
            </Section>

            <Section id="third-parties">
                <SectionTitle>Third parties</SectionTitle>
                <Body>
                    <p>
                        The only third party we share order information with is PayPal, and only what's needed
                        to process a payment you've chosen to make through them. We don't share your data with
                        data brokers, ad networks, or anyone else.
                    </p>
                </Body>
            </Section>

            <Section id="rights">
                <SectionTitle>Your rights</SectionTitle>
                <Body>
                    <p>
                        You can view and update your name, address, and phone number from your account at any
                        time. To request a copy of your data, or to have your account deleted, contact us - we'll
                        handle it directly rather than asking you to navigate a form.
                    </p>
                </Body>
            </Section>

            <Section id="contact">
                <SectionTitle>Contact</SectionTitle>
                <Body>
                    <p>
                        Questions about this policy go to{' '}
                        <a href="mailto:support@congmai.com">support@congmai.com</a>.
                    </p>
                </Body>
            </Section>
        </SupportLayout>
    )
}

export default PrivacyPolicyPage
