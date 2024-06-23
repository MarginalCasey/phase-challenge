import styled from "styled-components";

interface ColorPickerWrapperProps {
  $background: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ColorPickerWrapper = styled.div<ColorPickerWrapperProps>`
  border: 1px solid #e6e6e6;
  background-color: ${(props) => props.$background};
`;

export const ColorInput = styled.input`
  opacity: 0;
  display: block;
  width: 16px;
  height: 16px;
  border: none;
`;

export const ColorCode = styled.div`
  margin-left: 8px;
`;
