import styled from "styled-components";

export const RightPanelWrapper = styled.div`
  background-color: white;
  border-left: 1px solid #e6e6e6;
`;

export const Section = styled.section`
  padding: 8px;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 4px;

  & + & {
    border-top: 1px solid #e6e6e6;
  }
`;

export const Title = styled.div`
  grid-column-start: span 2;
  padding-left: 8px;
  line-height: 24px;
  font-weight: 600;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.898);
`;

export const FormItem = styled.label`
  padding: 0 8px;
  border: 1px solid transparent;
  height: 28px;
  font-size: 11px;
  display: flex;
  align-items: center;

  &:hover:not(:has(input:disabled)) {
    border: 1px solid #e6e6e6;
  }

  &:focus-within {
    border: 1px solid #0d99ff;
    outline: 1px solid #0d99ff;
  }

  > input {
    flex: 1 0 0%;
    border: none;
    min-width: 0;
    height: 100%;
    color: rgba(0, 0, 0, 0.898);
    outline: none;

    &:disabled {
      color: #0000004d;
      background-color: transparent;
    }
  }
`;

export const Label = styled.span`
  margin-left: -8px;
  width: 32px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

export const Unit = styled.span`
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.5);
`;
