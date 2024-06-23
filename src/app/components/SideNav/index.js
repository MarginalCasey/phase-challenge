"use client";

import styled from "styled-components";
import Elements from "./Elements";
import Pages from "./Pages";

const SideNavWrapper = styled.div`
  padding: 8px;
  background: #232323;
  color: white;
`;

const SideNav = () => {
  return (
    <SideNavWrapper>
      <Pages />
      <Elements />
    </SideNavWrapper>
  );
};

export default SideNav;
