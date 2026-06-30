import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    margin: 0;
    padding: 12px 16px;
    background: rgb(26, 148, 255);
    letter-spacing: 0.5px;
    text-transform: uppercase;
`

export const WrapperTextValue = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgb(56, 56, 61);
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    padding: 9px 16px;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    &:hover {
        color: rgb(26, 148, 255);
        background: rgb(230, 244, 255);
        border-left-color: rgb(26, 148, 255);
    }
`

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
`

export const WrapperTextPrice = styled.div`
    padding: 5px 10px;
    color: rgb(56, 56, 61);
    border-radius: 12px;
    background-color: rgb(238, 238, 238);
    width: fit-content;
    font-size: 12px;
    cursor: pointer;
    &:hover {
        background-color: rgb(26, 148, 255);
        color: #fff;
    }
`
