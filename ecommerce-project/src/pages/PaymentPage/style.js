import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: #fff;
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
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
  background: #fff;
  margin-top: 12px;
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 360px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  position: sticky;
  top: 20px;
`

export const WrapperCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 20px;
`

export const WrapperSummaryCard = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`

export const WrapperInfo = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 20px;
  background: #fff;
`

export const Lable = styled.span`
  font-size: 13px;
  color: #333;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 12px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  width: 100%;
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;

  .ant-radio-wrapper {
    font-size: 14px;
    color: #333;
  }

  .ant-radio-wrapper-checked {
    font-weight: 500;
  }
`
