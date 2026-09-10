import React from 'react'
import { Wrapper, Inner, Kicker, Headline, Lede } from './style'

const StoryLayout = ({ kicker, headline, lede, children }) => {
    return (
        <Wrapper>
            <Inner>
                {kicker && <Kicker>{kicker}</Kicker>}
                <Headline>{headline}</Headline>
                {lede && <Lede>{lede}</Lede>}
                {children}
            </Inner>
        </Wrapper>
    )
}

export default StoryLayout
export { Body, FactStrip, Fact, FactValue, FactLabel, Signature, RelatedLinks } from './style'
