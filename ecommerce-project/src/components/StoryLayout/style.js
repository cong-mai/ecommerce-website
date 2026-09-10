import styled from 'styled-components'

export const Wrapper = styled.div`
    background: var(--color-bg-surface);
    min-height: 75vh;
`

export const Inner = styled.div`
    max-width: 680px;
    margin: 0 auto;
    padding: 72px var(--space-page-x) 88px;
`

export const Kicker = styled.p`
    color: var(--color-primary);
    font-weight: 600;
    font-size: var(--font-size-sm);
    margin: 0 0 var(--space-3);
`

export const Headline = styled.h1`
    font-size: var(--font-size-3xl);
    line-height: 1.2;
    color: var(--color-ink);
    font-weight: 700;
    margin: 0 0 var(--space-6);
    max-width: 20ch;
`

export const Lede = styled.p`
    font-size: var(--font-size-lg);
    line-height: 1.6;
    color: var(--color-text);
    margin: 0 0 var(--space-8);
`

export const Body = styled.div`
    font-size: var(--font-size-base);
    line-height: 1.75;
    color: var(--color-text);

    p {
        margin: 0 0 var(--space-5);
    }

    h2 {
        font-size: var(--font-size-lg);
        color: var(--color-ink);
        margin: var(--space-8) 0 var(--space-3);
    }

    ul {
        margin: 0 0 var(--space-5);
        padding-left: 20px;
    }

    li {
        margin-bottom: var(--space-2);
    }

    a {
        color: var(--color-primary);
    }
`

export const FactStrip = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
    padding: var(--space-6) 0;
    margin: var(--space-8) 0;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
`

export const Fact = styled.div`
    min-width: 140px;
`

export const FactValue = styled.div`
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-ink);
`

export const FactLabel = styled.div`
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-top: 2px;
`

export const RelatedLinks = styled.div`
    margin-top: var(--space-10);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
    display: flex;
    gap: var(--space-6);
    flex-wrap: wrap;

    a {
        font-size: var(--font-size-sm);
        color: var(--color-primary);
        font-weight: 600;
    }
`

export const Signature = styled.div`
    margin-top: var(--space-10);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
`
