import { Upload } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
    width: 100%;
    background: #ececec;
    min-height: 80vh;
`

export const WrapperCard = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 560px;
    overflow: hidden;
`

export const WrapperAvatarSection = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 28px 24px;
    border-bottom: 1px solid #f0f0f0;
    background: #fafbfc;
`

export const WrapperLabel = styled.label`
    color: #333;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    width: 90px;
    flex-shrink: 0;
`

export const WrapperInput = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 16px 24px;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
        border-bottom: none;
    }
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
`