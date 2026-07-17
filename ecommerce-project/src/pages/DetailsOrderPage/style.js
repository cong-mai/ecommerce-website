import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    & > div {
      flex-basis: 100%;
    }
  }
`

export const WrapperInfoUser = styled.div`
  flex: 1;
  background: var(--color-white);
  border-radius: var(--radius-md);
  border: 1px solid #e8e8e8;
  padding: 16px 20px;

  .name-info {
    font-size: var(--font-size-sm);
    color: var(--color-text);
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .address-info, .phone-info, .delivery-info, .delivery-fee, .payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: var(--font-size-sm);
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
  font-size: var(--font-size-xs);
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
  background: var(--color-white);
  border-radius: var(--radius-md);
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
  min-width: 0;
  gap: 12px;

  img {
    border-radius: var(--radius-sm);
    flex-shrink: 0;
  }

  div {
    min-width: 0;
    font-size: var(--font-size-sm);
    color: var(--color-text);
  }
`

export const WrapperItem = styled.div`
  width: 160px;
  flex-shrink: 0;
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);

  &:last-child {
    color: var(--color-danger);
  }

  @media (max-width: 768px) {
    width: 90px;
  }
  @media (max-width: 480px) {
    width: 64px;
    font-size: var(--font-size-xs);
  }
`

export const WrapperItemLabel = styled.div`
  width: 160px;
  flex-shrink: 0;
  text-align: center;
  font-size: var(--font-size-xs);
  color: rgba(0, 0, 0, 0.45);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  &:last-child {
    font-weight: 700;
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    width: 90px;
  }
  @media (max-width: 480px) {
    width: 64px;
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
    font-size: var(--font-size-md);
    color: var(--color-danger);
    font-weight: 700;
  }
`
