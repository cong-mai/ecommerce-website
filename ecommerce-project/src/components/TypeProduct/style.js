import styled from "styled-components";

export const WrapperType = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
  border-radius: var(--radius-sm);
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`
