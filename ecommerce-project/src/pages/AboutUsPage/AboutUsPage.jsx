import React from 'react'
import StoryLayout, { Body, RelatedLinks } from '../../components/StoryLayout/StoryLayout'

const AboutUsPage = () => {
    return (
        <StoryLayout
            kicker="About us"
            headline="Electronics, chosen and shipped by people who actually use them"
            lede="Cong Mai sells phones, laptops, tablets, and the accessories that go with them - nothing else, so we can know all of it well."
        >
            <Body>
                <p>
                    We started this store around a simple frustration: most electronics retailers either sell
                    everything under the sun, or sell nothing you actually want in stock. We picked a narrower
                    lane - phones, laptops, tablets, and the cables, cases, and chargers that go with them - so
                    every listing on this site is something we'd genuinely recommend.
                </p>
                <h2>What we care about</h2>
                <p>
                    Accurate stock counts, so an order never gets placed for something we can't ship. Clear
                    pricing, with delivery fees shown before you check out, not sprung on you at the last step.
                    And support from people who know the difference between a USB-C and a USB-C that actually
                    delivers power.
                </p>
                <h2>How we work</h2>
                <p>
                    Cash on delivery or PayPal, your choice. Free delivery once your order reaches $50. Returns
                    accepted within 14 days, no interrogation. It's not complicated - we just try to do the
                    ordinary things reliably.
                </p>
            </Body>

            <RelatedLinks>
                <a href="/about/cong-mai">About Cong Mai</a>
                <a href="/careers">Careers</a>
                <a href="/support">Customer support</a>
            </RelatedLinks>
        </StoryLayout>
    )
}

export default AboutUsPage
