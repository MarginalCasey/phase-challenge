import OrigFrameIcon from "@/icons/FrameIcon";
import OrigRectangleIcon from "@/icons/RectangleIcon";
import OrigSelectIcon from "@/icons/SelectIcon";
import OrigTextIcon from "@/icons/TextIcon";
import styled from "styled-components";

export const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: #2c2c2c;
  display: flex;
  align-items: stretch;
`;

export const Button = styled.div<{ $active: boolean }>`
  width: 48px;
  background-color: ${(props) => (props.$active ? "#0d99ff" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.$active ? "#0d99ff" : "black")};
  }
`;

export const SelectIcon = styled(OrigSelectIcon)`
  width: 16px;
  height: 16px;
  fill: white;
`;

export const FrameIcon = styled(OrigFrameIcon)`
  width: 16px;
  height: 16px;
  fill: white;
`;

export const RectangleIcon = styled(OrigRectangleIcon)`
  width: 16px;
  height: 16px;
  stroke: white;
`;

export const TextIcon = styled(OrigTextIcon)`
  width: 16px;
  height: 16px;
  fill: white;
`;
