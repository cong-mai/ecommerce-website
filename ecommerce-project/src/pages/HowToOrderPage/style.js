import styled from 'styled-components'

export const Steps = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: step;
`

export const Step = styled.li`
    counter-increment: step;
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: var(--space-4);

    & + & {
        margin-top: var(--space-6);
        padding-top: var(--space-6);
        border-top: 1px solid var(--color-border);
    }

    &::before {
        content: counter(step);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--color-primary-tint);
        color: var(--color-primary);
        font-weight: 700;
        font-size: var(--font-size-sm);
    }
`

export const StepTitle = styled.h3`
    font-size: var(--font-size-md);
    font-weight: 700;
    color: var(--color-text);
    margin: 4px 0 var(--space-2);
`

export const StepBody = styled.p`
    font-size: var(--font-size-base);
    line-height: 1.65;
    color: var(--color-text-secondary);
    margin: 0;
    max-width: 56ch;
`
