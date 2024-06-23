import styled from "styled-components";

export const PagesWrapper = styled.div`
  border-bottom: 1px solid #e6e6e6;
  font-size: 11px;
`;

export const Title = styled.div`
  padding: 0 16px;
  line-height: 40px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.898);
`;

interface LinkProps {
  $active?: boolean;
}

export const Link = styled.div<LinkProps>`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 16px;
  font-weight: ${(props) => (props.$active ? 500 : 400)};
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Input = styled.input`
  height: 32px;
  margin: 0 8px;
  padding: 0 8px;

  &:focus-within {
    border: 1px solid #0d99ff;
    outline: 1px solid #0d99ff;
  }
`;
