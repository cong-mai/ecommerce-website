import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: var(--color-white);
    font-size: var(--font-size-sm);
    font-weight: 700;
    margin: 0;
    padding: 12px 16px;
    background: var(--color-primary);
    letter-spacing: 0.5px;
    text-transform: uppercase;
`

export const WrapperTextValue = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    font-weight: 400;
    cursor: pointer;
    padding: 9px 16px;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    &:hover {
        color: var(--color-primary);
        background: rgb(230, 244, 255);
        border-left-color: var(--color-primary);
    }

    @media (max-width: 768px) {
        flex-shrink: 0;
        white-space: nowrap;
        border-left: none;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 6px 14px;
        &:hover {
            border-color: var(--color-primary);
        }
    }
`

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 0;

    @media (max-width: 768px) {
        flex-direction: row;
        overflow-x: auto;
        gap: 8px;
        padding: 10px 12px;
        &::-webkit-scrollbar { display: none; }
    }
`

export const WrapperTextPrice = styled.div`
    padding: 5px 10px;
    color: var(--color-text-secondary);
    border-radius: var(--radius-lg);
    background-color: rgb(238, 238, 238);
    width: fit-content;
    font-size: var(--font-size-xs);
    cursor: pointer;
    &:hover {
        background-color: var(--color-primary);
        color: var(--color-white);
    }
`
