import styled from 'styled-components'

export const ChannelList = styled.dl`
    margin: 0 0 var(--space-8);
    display: grid;
    gap: var(--space-4);
`

export const Channel = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: var(--space-4);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--color-border);

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 4px;
    }
`

export const ChannelLabel = styled.dt`
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
`

export const ChannelValue = styled.dd`
    margin: 0;
    font-size: var(--font-size-base);
    color: var(--color-text);
    font-weight: 600;

    a {
        color: var(--color-text);
        &:hover { color: var(--color-primary); }
    }
`

export const Form = styled.form`
    display: grid;
    gap: var(--space-4);
    max-width: 480px;
`

export const Field = styled.div`
    display: grid;
    gap: 6px;
`

export const Label = styled.label`
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
`

export const InputBase = `
    padding: 10px 14px;
    font-size: var(--font-size-base);
    font-family: var(--font-family);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text);

    &:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 1px;
        border-color: var(--color-primary);
    }
`

export const Input = styled.input`${InputBase}`
export const Textarea = styled.textarea`
    ${InputBase}
    resize: vertical;
`

export const SubmitButton = styled.button`
    justify-self: start;
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
`

export const FormNote = styled.p`
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    margin: -8px 0 0;
`
