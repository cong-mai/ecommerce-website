import React, { useState } from 'react'
import SupportLayout, { Section, SectionTitle } from '../../components/SupportLayout/SupportLayout'
import {
    ChannelList, Channel, ChannelLabel, ChannelValue,
    Form, Field, Label, Input, Textarea, SubmitButton, FormNote
} from './style'

const navLinks = [
    { to: '/support/help-center', label: 'Help center' },
    { to: '/support/track-order', label: 'Track my order' },
    { to: '/support/return-policy', label: 'Return policy' },
    { to: '/support/how-to-order', label: 'How to order' },
]

const ContactUsPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Message from ${name || 'a customer'}`)
        const body = encodeURIComponent(`${message}\n\n- ${name} (${email})`)
        window.location.href = `mailto:support@congmai.com?subject=${subject}&body=${body}`
    }

    return (
        <SupportLayout
            backTo="/support"
            backLabel="← Customer support"
            title="Contact us"
            intro="Real people, not a ticket queue. Reach us however's easiest."
            navLinks={navLinks}
        >
            <Section id="channels">
                <SectionTitle>Ways to reach us</SectionTitle>
                <ChannelList>
                    <Channel>
                        <ChannelLabel>Phone</ChannelLabel>
                        <ChannelValue><a href="tel:+15043445222">+1 (504) 344-5222</a></ChannelValue>
                    </Channel>
                    <Channel>
                        <ChannelLabel>Email</ChannelLabel>
                        <ChannelValue><a href="mailto:support@congmai.com">support@congmai.com</a></ChannelValue>
                    </Channel>
                    <Channel>
                        <ChannelLabel>Hours</ChannelLabel>
                        <ChannelValue>Monday–Saturday, 8am–10pm</ChannelValue>
                    </Channel>
                </ChannelList>
            </Section>

            <Section id="message">
                <SectionTitle>Send a message</SectionTitle>
                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="contact-name">Your name</Label>
                        <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Field>
                    <Field>
                        <Label htmlFor="contact-email">Your email</Label>
                        <Input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Field>
                    <Field>
                        <Label htmlFor="contact-message">Message</Label>
                        <Textarea id="contact-message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </Field>
                    <SubmitButton type="submit">Send message</SubmitButton>
                    <FormNote>Opens your email app with this message ready to send to support@congmai.com.</FormNote>
                </Form>
            </Section>
        </SupportLayout>
    )
}

export default ContactUsPage
