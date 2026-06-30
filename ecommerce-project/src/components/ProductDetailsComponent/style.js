import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 72px;
    width: 72px;
    object-fit: cover;
    border-radius: 6px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color 0.2s;
    &:hover {
        border-color: rgb(26, 148, 255);
    }
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    word-break: break-word;
    margin-bottom: 8px;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 13px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`

export const WrapperPriceProduct = styled.div`
    background: #fff8f8;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 12px 0;
    border-left: 4px solid rgb(255, 57, 69);
`

export const WrapperPriceTextProduct = styled.span`
    font-size: 32px;
    font-weight: 700;
    color: rgb(255, 57, 69);
    margin-right: 12px;
`

export const WrapperPriceDiscount = styled.span`
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
    margin-right: 8px;
`

export const WrapperDiscountBadge = styled.span`
    background: rgb(255, 57, 69);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    vertical-align: middle;
`

export const WrapperAddressProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 0;
    font-size: 14px;
    span.address {
        text-decoration: underline;
        font-weight: 600;
        color: #333;
    }
    span.change-address {
        color: rgb(11, 116, 229);
        font-weight: 500;
        cursor: pointer;
        &:hover { text-decoration: underline; }
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 6px;
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
        font-size: 15px;
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
    font-size: 16px;
    transition: background 0.2s;
    &:hover { background: #e0e0e0; }
    &:disabled { cursor: not-allowed; opacity: 0.4; }
`

export const WrapperStockInfo = styled.div`
    font-size: 13px;
    color: ${props => props.$inStock ? '#2e7d32' : '#c62828'};
    font-weight: 500;
    margin-top: 4px;
`
