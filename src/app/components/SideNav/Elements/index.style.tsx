import styled from "styled-components";

export const IconWrapper = styled.div`
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ElementName = styled.div`
  padding: 0 8px;
`;

export const Link = styled.div<{ $active: boolean; $level: number }>`
  padding-left: ${(props) => props.$level * 16}px;
  padding-right: 16px;
  height: 32px;
  font-weight: ${(props) => (props.$active ? 500 : 400)};
  font-size: 11px;
  color: rgba(0, 0, 0, 0.898);
  background-color: ${(props) => (props.$active ? "#e5f4ff" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f5f5f5;
  }

  ${IconWrapper} {
    fill: ${(props) =>
      props.$active ? "rgba(0, 0, 0, 0.898)" : "rgba(0, 0, 0, 0.3)"};
    stroke: ${(props) =>
      props.$active ? "rgba(0, 0, 0, 0.898)" : "rgba(0, 0, 0, 0.3)"};
  }
`;
