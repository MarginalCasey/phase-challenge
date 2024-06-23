"use client";

import usePageStore from "@/hooks/usePageStore";
import { ElementType } from "@/types";
import BlockProperties from "./BlockProperties";
import CommonProperties from "./CommonProperties";
import useActiveElement from "./hooks/useActiveElement";
import { RightPanelWrapper } from "./index.style";

const RightPanel = () => {
  const element = useActiveElement();
  const renderedElement = usePageStore((state) => state.activeElement);

  return (
    <RightPanelWrapper>
      {element && renderedElement && (
        <>
          <CommonProperties element={element} />
          {(element.type === ElementType.Frame ||
            element.type === ElementType.Rectangle) && (
            <BlockProperties element={element} />
          )}
        </>
      )}
    </RightPanelWrapper>
  );
};

export default RightPanel;
