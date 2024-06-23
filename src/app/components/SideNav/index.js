"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";
import Elements from "./Elements";
import Pages from "./Pages";

const SideNavWrapper = styled.div`
  background-color: white;
  border-right: 1px solid #e6e6e6;
`;

const SideNav = () => {
  const pathname = usePathname();
  const currentPageId = Number(pathname.replace("/", ""));

  return (
    <SideNavWrapper>
      <Pages currentPageId={currentPageId} />
      <Elements currentPageId={currentPageId} />
    </SideNavWrapper>
  );
};

export default SideNav;
