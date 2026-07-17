import { Checkbox } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: var(--color-white);
  padding: 14px 20px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  span {
    color: var(--color-text);
    font-weight: 500;
    font-size: var(--font-size-sm);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
export const WrapperStyleHeaderDilivery = styled.div`
  background: var(--color-white);
  padding: 16px 20px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  span {
    color: var(--color-text);
    font-weight: 400;
    font-size: var(--font-size-sm);
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
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 14px 16px;
  }
`

export const WrapperItemInfo = styled.div`
  width: 390px;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const WrapperItemName = styled.div`
  width: 250px;
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--font-size-sm);
  color: var(--color-text);
`

export const WrapperItemActions = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 12px;
    flex-wrap: wrap;
  }
`

export const WrapperHeaderCheckAll = styled.span`
  display: inline-block;
  width: 390px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 8px;
  }
`

export const WrapperHeaderLabels = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const WrapperHeaderLabelText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
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
  width: 96px;
  border: 1px solid #e0e0e0;
  border-radius: var(--radius-sm);
  overflow: hidden;
`

export const WrapperRight = styled.div`
  width: 320px;
  max-width: 100%;
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
  background: var(--color-white);
  border-top-right-radius: var(--radius-md);
  border-top-left-radius: var(--radius-md);
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 20px;
  background: var(--color-white);
  border-bottom-right-radius: var(--radius-md);
  border-bottom-left-radius: var(--radius-md);
`

export const WrapperSummaryCard = styled.div`
  width: 100%;
  border-radius: var(--radius-md);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  overflow: hidden;
`

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: var(--color-primary);
  }
`
