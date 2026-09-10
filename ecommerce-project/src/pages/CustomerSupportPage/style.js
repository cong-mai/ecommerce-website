import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
    background: var(--color-bg-page);
    min-height: 75vh;
`

export const Inner = styled.div`
    max-width: 760px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-page-x) 64px;
`

export const Title = styled.h1`
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 var(--space-3);
`

export const Rule = styled.div`
    width: 56px;
    height: 3px;
    background: var(--color-primary);
    margin-bottom: var(--space-4);
`

export const Intro = styled.p`
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    line-height: 1.6;
    max-width: 60ch;
    margin: 0 0 var(--space-8);
`

export const List = styled.div`
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
`

export const Row = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-4);
    padding: var(--space-5) var(--space-6);
    color: var(--color-text);

    & + & {
        border-top: 1px solid var(--color-border);
    }

    &:hover {
        background: var(--color-primary-tint);
    }
`

export const RowLabel = styled.span`
    font-size: var(--font-size-md);
    font-weight: 600;
    color: var(--color-text);
`

export const RowDescription = styled.span`
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-align: right;
`

export const DirectLine = styled.div`
    margin-top: var(--space-8);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);

    a {
        color: var(--color-primary);
    }
`
