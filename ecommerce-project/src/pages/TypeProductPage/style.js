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
    background: #fff;
    margin-right: 16px;
    padding: 0;
    border-radius: 8px;
    height: fit-content;
    margin-top: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    overflow: hidden;
`

export const WrapperCategoryTitle = styled.div`
    background: #fff;
    border-radius: 8px;
    padding: 14px 20px;
    margin-top: 16px;
    font-size: 17px;
    font-weight: 700;
    color: rgb(36, 36, 36);
    text-transform: capitalize;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    border-left: 4px solid rgb(26, 148, 255);
    display: flex;
    align-items: center;
    gap: 8px;
    &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 18px;
        background: rgb(26, 148, 255);
        border-radius: 2px;
        margin-right: 4px;
    }
`
