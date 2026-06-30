import { Checkbox } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: #fff;
  padding: 14px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  span {
    color: rgb(36, 36, 36);
    font-weight: 500;
    font-size: 13px;
  }
`
export const WrapperStyleHeaderDilivery = styled.div`
  background: #fff;
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 12px;
`

export const WrapperLeft = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 910px;
`

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
  }
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
  width: 96px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
`

export const WrapperRight = styled.div`
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  position: sticky;
  top: 20px;
`

export const WrapperInfo = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 20px;
  background: #fff;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`

export const WrapperSummaryCard = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  overflow: hidden;
`

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: rgb(26, 148, 255);
    border-color: rgb(26, 148, 255);
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: rgb(26, 148, 255);
  }
`
