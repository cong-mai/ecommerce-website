import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: rgb(36, 36, 36);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
`
export const WrapperTextValue = styled.span`
    color: rgb(56, 56, 61);
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
    &:hover {
        color: rgb(26, 148, 255);
        background: rgb(230, 244, 255);
    }
`
export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
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
