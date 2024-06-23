"use client";

import styled from "styled-components";
import Elements from "./Elements";
import Pages from "./Pages";

const SideNavWrapper = styled.div`
  background-color: white;
  border-right: 1px solid #e6e6e6;
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
