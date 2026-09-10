import React from 'react'
import StoryLayout, { Body, Signature, RelatedLinks } from '../../components/StoryLayout/StoryLayout'

const AboutCongMaiPage = () => {
    return (
        <StoryLayout
            kicker="About the founder"
            headline="Hi, I'm Cong Mai"
            lede="I built this store because I kept building the software for other people's, and wanted to run one the way I'd actually want to shop."
        >
            <Body>
                <p>
                    Before this was a store, it was a lot of late nights writing the checkout flow, the order
                    tracking, the little details most shoppers never notice unless they break. Somewhere in
                    that process I realized I cared more about getting those details right than about any one
                    product category - so I picked the electronics I know best and built a shop around doing
                    the basics properly.
                </p>
                <h2>Why electronics</h2>
                <p>
                    I've bought enough phones and laptops from places that got the product right and the process
                    wrong - vague shipping windows, returns that felt like a fight, support that read from a
                    script. This store is my attempt at the opposite: stock that's actually in stock, a return
                    policy in plain language, and a real inbox on the other end of the contact form.
                </p>
                <h2>If you need anything</h2>
                <p>
                    Support questions usually go to our team first, but if something's stuck or you just want to
                    tell me what's working and what isn't, email is the fastest way to reach me directly.
                </p>
            </Body>

            <Signature>- Cong Mai, founder</Signature>

            <RelatedLinks>
                <a href="/about">About us</a>
                <a href="/careers">Careers</a>
                <a href="/support/contact-us">Contact us</a>
            </RelatedLinks>
        </StoryLayout>
    )
}

export default AboutCongMaiPage
