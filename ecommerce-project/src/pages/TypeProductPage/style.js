import styled from "styled-components"
import { Col } from 'antd'

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 16px;

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

export const WrapperNavbar = styled(Col)`
    background: var(--color-white);
    margin-right: 16px;
    padding: 0;
    border-radius: var(--radius-md);
    height: fit-content;
    margin-top: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    overflow: hidden;

    @media (max-width: 768px) {
        margin-right: 0;
    }
`

export const WrapperCategoryTitle = styled.div`
    background: var(--color-white);
    border-radius: var(--radius-md);
    padding: 14px 20px;
    margin-top: 16px;
    font-size: var(--font-size-md);
    font-weight: 700;
    color: var(--color-text);
    text-transform: capitalize;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    border-left: 4px solid var(--color-primary);
    display: flex;
    align-items: center;
    gap: 8px;
    &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 18px;
        background: var(--color-primary);
        border-radius: 2px;
        margin-right: 4px;
    }
`
