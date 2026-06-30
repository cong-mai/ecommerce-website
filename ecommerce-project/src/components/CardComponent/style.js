import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.2s;

    &:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.13);
    }

    .ant-card-cover img {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    .ant-card-body {
        padding: 10px 12px 12px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
`

export const StyleNameProduct = styled.div`
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    color: rgb(36, 36, 36);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 36px;
`

export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 4px;
    gap: 2px;
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 15px;
    font-weight: 600;
    margin-top: auto;
    display: flex;
    align-items: baseline;
    gap: 6px;
`

export const WrapperDiscountText = styled.span`
    color: rgb(150, 150, 150);
    font-size: 12px;
    font-weight: 400;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 12px;
    line-height: 20px;
    color: rgb(120, 120, 120);
`
