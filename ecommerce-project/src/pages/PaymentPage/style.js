import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: var(--color-white);
  padding: 9px 16px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  span {
    color: var(--color-text);
    font-weight: 400;
    font-size: var(--font-size-sm);
  }
`

export const WrapperLeft = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const WrapperListOrder = styled.div``

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: var(--color-white);
  margin-top: 12px;
`

export const WrapperPriceDiscount = styled.span`
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  text-decoration: line-through;
  margin-left: 4px;
`

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: var(--radius-sm);
`

export const WrapperRight = styled.div`
  width: 360px;
  max-width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  position: sticky;
  top: 20px;
`

export const WrapperCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 20px;
`

export const WrapperSummaryCard = styled.div`
  width: 100%;
  border-radius: var(--radius-md);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`

export const WrapperInfo = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: var(--color-white);
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 20px;
  background: var(--color-white);
`

export const Lable = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 12px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  width: 100%;
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;

  .ant-radio-wrapper {
    font-size: var(--font-size-sm);
    color: var(--color-text);
  }

  .ant-radio-wrapper-checked {
    font-weight: 500;
  }
`
