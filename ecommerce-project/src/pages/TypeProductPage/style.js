import styled from "styled-components"
import { Col } from 'antd'

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;
`
export const WrapperNavbar = styled(Col)`
    background: #fff;
    margin-right: 12px;
    padding: 16px;
    border-radius: 6px;
    height: fit-content;
    margin-top: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`

export const WrapperCategoryTitle = styled.div`
    background: #fff;
    border-radius: 6px;
    padding: 12px 16px;
    margin-top: 20px;
    margin-bottom: 4px;
    font-size: 15px;
    font-weight: 600;
    color: rgb(36, 36, 36);
    text-transform: capitalize;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`
