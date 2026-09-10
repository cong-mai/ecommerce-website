import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
    background: var(--color-bg-page);
    min-height: 75vh;
`

export const Inner = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-page-x) 64px;
`

export const Header = styled.div`
    margin-bottom: var(--space-8);
`

export const Eyebrow = styled(Link)`
    display: inline-block;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-3);

    &:hover {
        color: var(--color-primary);
    }
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
    max-width: 640px;
    line-height: 1.6;
    margin: 0;
`

export const Layout = styled.div`
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: var(--space-10);
    align-items: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-6);
    }
`

export const Rail = styled.nav`
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-left: 2px solid var(--color-border);

    @media (max-width: 768px) {
        position: static;
        flex-direction: row;
        flex-wrap: wrap;
        border-left: none;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: var(--space-4);
        gap: var(--space-2);
    }
`

export const RailItem = styled.a`
    display: block;
    padding: 8px 0 8px 16px;
    margin-left: -2px;
    border-left: 2px solid transparent;
    font-size: var(--font-size-sm);
    color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-text-secondary)')};
    font-weight: ${(props) => (props.$active ? 600 : 400)};
    border-left-color: ${(props) => (props.$active ? 'var(--color-primary)' : 'transparent')};
    cursor: pointer;

    &:hover {
        color: var(--color-primary);
    }

    @media (max-width: 768px) {
        padding: 6px 12px;
        margin-left: 0;
        border-left: none;
        border-radius: var(--radius-sm);
        background: ${(props) => (props.$active ? 'var(--color-primary-tint)' : 'transparent')};
    }
`

export const RailLink = styled(Link)`
    display: block;
    padding: 8px 0 8px 16px;
    margin-left: -2px;
    border-left: 2px solid transparent;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);

    &:hover {
        color: var(--color-primary);
        border-left-color: var(--color-primary);
    }

    @media (max-width: 768px) {
        padding: 6px 12px;
        margin-left: 0;
        border-left: none;
        border-radius: var(--radius-sm);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border);
    }
`

export const Content = styled.div`
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-8);
    min-width: 0;

    @media (max-width: 768px) {
        padding: var(--space-5);
    }
`

export const Section = styled.section`
    scroll-margin-top: 96px;

    & + & {
        margin-top: var(--space-8);
        padding-top: var(--space-8);
        border-top: 1px solid var(--color-border);
    }
`

export const SectionTitle = styled.h2`
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 var(--space-4);
`

export const Body = styled.div`
    font-size: var(--font-size-base);
    line-height: 1.7;
    color: var(--color-text);
    max-width: 68ch;

    p {
        margin: 0 0 var(--space-4);
    }

    ul {
        margin: 0 0 var(--space-4);
        padding-left: 20px;
    }

    li {
        margin-bottom: var(--space-2);
    }

    a {
        color: var(--color-primary);
    }
`
