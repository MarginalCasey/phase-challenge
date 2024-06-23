"use client";

import styled from "styled-components";
import Elements from "./Elements";
import Pages from "./Pages";

const LeftPanelWrapper = styled.div`
  padding: 8px;
  background: #232323;
  color: white;
`;

const LeftPanel = () => {
  return (
    <LeftPanelWrapper>
      <Pages />
      <Elements />
    </LeftPanelWrapper>
  );
};

export default LeftPanel;
