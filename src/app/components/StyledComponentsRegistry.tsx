"use client";

import { useServerInsertedHTML } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

interface StyledComponentsRegistryProps {
  children: React.ReactNode;
}

const StyledComponentsRegistry: FC<StyledComponentsRegistryProps> = ({
  children,
}) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};

export default StyledComponentsRegistry;
