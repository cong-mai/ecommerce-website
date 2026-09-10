import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    gap: var(--space-3);
    max-width: 480px;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`

export const Input = styled.input`
    flex: 1;
    padding: 10px 14px;
    font-size: var(--font-size-base);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text);

    &:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 1px;
        border-color: var(--color-primary);
    }
`

export const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-white);
    background: var(--color-primary);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;

    &:hover {
        background: var(--color-primary-hover);
    }

    &:focus-visible {
        outline: 2px solid var(--color-ink);
        outline-offset: 2px;
    }
`

export const Hint = styled.p`
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: var(--space-3) 0 0;
`

export const ErrorText = styled.p`
    font-size: var(--font-size-sm);
    color: var(--color-danger);
    margin: var(--space-3) 0 0;
`

export const SignInPanel = styled.div`
    background: var(--color-primary-tint);
    border-radius: var(--radius-md);
    padding: var(--space-6);
    max-width: 480px;
`

export const SignInText = styled.p`
    margin: 0 0 var(--space-4);
    color: var(--color-text);
    line-height: 1.6;
`

export const SignInButton = styled.button`
    padding: 10px 20px;
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-white);
    background: var(--color-ink);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
`
