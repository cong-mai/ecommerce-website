import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 16px;
`

export const WrapperInfoUser = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 16px 20px;

  .name-info {
    font-size: 14px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .address-info, .phone-info, .delivery-info, .delivery-fee, .payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 6px;
    span {
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .name-delivery {
    color: rgb(234, 133, 0);
    font-weight: bold;
  }
  .status-payment {
    margin-top: 8px;
    font-weight: 600;
    color: rgb(234, 133, 0);
  }
`

export const WrapperLabel = styled.div`
  color: rgba(0, 0, 0, 0.45);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`

export const WrapperContentInfo = styled.div``

export const WrapperStyleContent = styled.div`
  margin-top: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 0 20px 20px;
`

export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-of-type {
    border-bottom: none;
  }
`

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;

  img {
    border-radius: 4px;
    flex-shrink: 0;
  }

  div {
    font-size: 13px;
    color: #333;
  }
`

export const WrapperItem = styled.div`
  width: 160px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #333;

  &:last-child {
    color: rgb(255, 66, 78);
  }
`

export const WrapperItemLabel = styled.div`
  width: 160px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  &:last-child {
    font-weight: 700;
    color: #333;
  }
`

export const WrapperTableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 4px;
`

export const WrapperAllPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 4px;

  &:last-child span:last-child {
    font-size: 18px;
    color: rgb(255, 66, 78);
    font-weight: 700;
  }
`
