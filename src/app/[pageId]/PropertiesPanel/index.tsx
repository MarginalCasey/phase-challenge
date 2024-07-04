"use client";

import usePageStore from "@/hooks/usePageStore";
import { ElementType } from "@/types";
import BlockProperties from "./BlockProperties";
import CommonProperties from "./CommonProperties";
import useActiveElement from "./hooks/useActiveElement";
import { PanelWrapper } from "./index.style";

const PropertiesPanel = () => {
  const element = useActiveElement();
  const renderedElement = usePageStore((state) => state.activeElement);

  return (
    <PanelWrapper data-testid="element-properties" data-id={element?.id}>
      {element && renderedElement && (
        <>
          <CommonProperties element={element} />
          {(element.type === ElementType.Frame ||
            element.type === ElementType.Rectangle) && (
            <BlockProperties element={element} />
          )}
        </>
      )}
    </PanelWrapper>
  );
};

export default PropertiesPanel;
