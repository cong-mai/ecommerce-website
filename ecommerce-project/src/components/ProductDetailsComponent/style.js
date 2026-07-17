import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 72px;
    width: 72px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color 0.2s;
    &:hover {
        border-color: var(--color-primary);
    }

    @media (max-width: 600px) {
        height: 44px;
        width: 44px;
    }
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperImageCol = styled(Col)`
    border-right: 1px solid #f0f0f0;
    padding: 24px 16px;

    @media (max-width: 768px) {
        border-right: none;
        border-bottom: 1px solid #f0f0f0;
        padding: 16px;
    }
`

export const WrapperInfoCol = styled(Col)`
    padding: 24px 28px;

    @media (max-width: 768px) {
        padding: 16px;
    }
`

export const WrapperStyleNameProduct = styled.h1`
    color: var(--color-text);
    font-size: var(--font-size-xl);
    font-weight: 600;
    line-height: 30px;
    word-break: break-word;
    margin-bottom: 8px;
`

export const WrapperStyleTextSell = styled.span`
    font-size: var(--font-size-sm);
    line-height: 24px;
    color: var(--color-text-muted);
`

export const WrapperPriceProduct = styled.div`
    background: #fff8f8;
    border-radius: var(--radius-md);
    padding: 12px 16px;
    margin: 12px 0;
    border-left: 4px solid var(--color-danger);
`

export const WrapperPriceTextProduct = styled.span`
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-danger);
    margin-right: 12px;
`

export const WrapperPriceDiscount = styled.span`
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    text-decoration: line-through;
    margin-right: 8px;
`

export const WrapperDiscountBadge = styled.span`
    background: var(--color-danger);
    color: var(--color-white);
    font-size: var(--font-size-xs);
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    vertical-align: middle;
`

export const WrapperAddressProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 0;
    font-size: var(--font-size-sm);
    span.address {
        text-decoration: underline;
        font-weight: 600;
        color: var(--color-text);
    }
    span.change-address {
        color: var(--color-primary-hover);
        font-weight: 500;
        cursor: pointer;
        &:hover { text-decoration: underline; }
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: var(--radius-sm);
    overflow: hidden;
    width: fit-content;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number {
        width: 52px;
        border-top: none;
        border-bottom: none;
        border-radius: 0;
        text-align: center;
    }
    .ant-input-number-handler-wrap {
        display: none !important;
    }
    .ant-input-number-input {
        text-align: center;
        font-weight: 600;
        font-size: var(--font-size-sm);
    }
`

export const WrapperCountButton = styled.button`
    width: 36px;
    height: 36px;
    border: none;
    background: #f5f5f5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-base);
    transition: background 0.2s;
    &:hover { background: #e0e0e0; }
    &:disabled { cursor: not-allowed; opacity: 0.4; }
`

export const WrapperStockInfo = styled.div`
    font-size: var(--font-size-sm);
    color: ${props => props.$inStock ? '#2e7d32' : '#c62828'};
    font-weight: 500;
    margin-top: 4px;
`
