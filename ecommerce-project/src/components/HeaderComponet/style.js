import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: var(--color-primary);
    align-items: center;
    gap: 12px 16px;
    flex-wrap: nowrap;
    padding: 10px var(--space-page-x);

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`

export const WrapperTextHeader = styled(Link)`
    display: inline-flex;
    align-items: center;
    font-size: var(--font-size-md);
    color: var(--color-white);
    font-weight: bold;
    text-align: left;
    &:hover {
        font-size: var(--font-size-md);
        color: var(--color-white);
    }
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: var(--color-white);
    gap: 10px;
    max-width: 200px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: var(--font-size-xs);
    color: var(--color-white);
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: var(--color-primary);
    }
`