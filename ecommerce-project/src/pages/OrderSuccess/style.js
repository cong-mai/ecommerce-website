import styled from "styled-components";

export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  padding: 10px 14px;
  width: fit-content;
  border-radius: var(--radius-sm);
  margin-top: 8px;
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 600;
`

export const WrapperContainer = styled.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const WrapperInfo = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 20px 24px;
  width: 100%;
`

export const WrapperItemOrderInfo = styled.div`
  width: 100%;
  border-radius: var(--radius-md);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: var(--color-white);
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    padding: 14px 16px;
  }
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`

export const Lable = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`
