import React from 'react'
import StoryLayout, { Body, FactStrip, Fact, FactValue, FactLabel, RelatedLinks } from '../../components/StoryLayout/StoryLayout'

const CareersPage = () => {
    return (
        <StoryLayout
            kicker="Careers"
            headline="A small team, hiring occasionally"
            lede="We're not a large company, and we're not pretending to be. When we need help, it's for something specific."
        >
            <FactStrip>
                <Fact>
                    <FactValue>Small</FactValue>
                    <FactLabel>Team size</FactLabel>
                </Fact>
                <Fact>
                    <FactValue>As needed</FactValue>
                    <FactLabel>Hiring cadence</FactLabel>
                </Fact>
                <Fact>
                    <FactValue>Remote-friendly</FactValue>
                    <FactLabel>Where we work</FactLabel>
                </Fact>
            </FactStrip>

            <Body>
                <p>
                    We don't keep a running list of open roles, because most of the time there isn't one. What we
                    do keep is a short list of people who reached out with something specific to offer - customer
                    support, logistics, or front-end development - and we go back to that list first when a role
                    does open up.
                </p>
                <h2>If you'd like to be on that list</h2>
                <p>
                    Email us at <a href="mailto:careers@congmai.com">careers@congmai.com</a> with what you do and
                    a link to something you've made or worked on. No cover letter needed - we'd rather see the
                    work.
                </p>
            </Body>

            <RelatedLinks>
                <a href="/about">About us</a>
                <a href="/about/cong-mai">About Cong Mai</a>
            </RelatedLinks>
        </StoryLayout>
    )
}

export default CareersPage
