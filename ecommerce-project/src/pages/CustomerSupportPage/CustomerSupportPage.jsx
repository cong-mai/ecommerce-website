import React from 'react'
import { Wrapper, Inner, Title, Rule, Intro, List, Row, RowLabel, RowDescription, DirectLine } from './style'

const topics = [
    { to: '/support/track-order', label: 'Track my order', description: 'See where your order is right now' },
    { to: '/support/how-to-order', label: 'How to order', description: 'From browsing to checkout' },
    { to: '/support/return-policy', label: 'Return policy', description: 'Returns, refunds, and exchanges' },
    { to: '/support/help-center', label: 'Help center', description: 'Answers to common questions' },
    { to: '/support/contact-us', label: 'Contact us', description: 'Talk to a real person' },
]

const CustomerSupportPage = () => {
    return (
        <Wrapper>
            <Inner>
                <Title>Customer support</Title>
                <Rule />
                <Intro>
                    Whatever you need - before an order, during one, or after it's arrived - start here.
                    Pick the topic closest to your question.
                </Intro>

                <List>
                    {topics.map((topic) => (
                        <Row key={topic.to} to={topic.to}>
                            <RowLabel>{topic.label}</RowLabel>
                            <RowDescription>{topic.description}</RowDescription>
                        </Row>
                    ))}
                </List>

                <DirectLine>
                    Can't find it here? Call <a href="tel:+15043445222">+1 (504) 344-5222</a> or email{' '}
                    <a href="mailto:support@congmai.com">support@congmai.com</a>, Mon–Sat, 8am–10pm.
                </DirectLine>
            </Inner>
        </Wrapper>
    )
}

export default CustomerSupportPage
