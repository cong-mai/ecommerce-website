import styled from "styled-components";

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #ececec;
  min-height: 100vh;
`

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 20px auto 0;
`

export const WrapperItemOrder = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`

export const WrapperStatus = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafbfc;
`

export const WrapperStatusBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  background: ${(props) => (props.$active ? 'rgb(230, 247, 233)' : 'rgb(255, 241, 240)')};
  color: ${(props) => (props.$active ? 'rgb(56, 158, 13)' : 'rgb(255, 77, 79)')};
`

export const WrapperHeaderItem = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 14px 20px;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
`

export const WrapperFooterItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
  width: 100%;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafbfc;
`