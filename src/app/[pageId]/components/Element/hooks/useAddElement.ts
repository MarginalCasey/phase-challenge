import usePageStore from "@/hooks/usePageStore";
import useToolbarStore, { Tool } from "@/hooks/useToolbarStore";
import { ElementType } from "@/types";
import type { Container, FederatedPointerEvent } from "pixi.js";
import { useCallback, useEffect } from "react";

interface UseAddElementProps {
  container: Container | null;
  path: string | null;
  disabled?: boolean;
}

const useAddElement = ({
  container,
  path,
  disabled = false,
}: UseAddElementProps) => {
  const currentTool = useToolbarStore((state) => state.currentTool);
  const setCurrentTool = useToolbarStore((state) => state.setCurrentTool);
  const addElement = usePageStore((state) => state.addElement);
  const setActiveElementPath = usePageStore(
    (state) => state.setActiveElementPath,
  );

  const handlePointerDown = useCallback(
    (event: FederatedPointerEvent) => {
      function selectNewElement() {
        setCurrentTool(Tool.Select);
        setActiveElementPath(`${path ?? ""}/${id}`);
      }

      if (!container) return;

      const { x, y } = container.toLocal(event.global);
      const id = Date.now().toString();

      if (currentTool === ElementType.Rectangle) {
        event.stopPropagation();

        addElement(path, {
          type: ElementType.Rectangle,
          id,
          name: "Rectangle",
          x: x - 50,
          y: y - 50,
          alpha: 1,
          width: 100,
          height: 100,
          fill: {
            color: "#d9d9d9",
            alpha: 1,
          },
        });
        selectNewElement();
      } else if (currentTool === ElementType.Frame) {
        event.stopPropagation();

        addElement(path, {
          type: ElementType.Frame,
          id,
          name: "Frame",
          x: x - 50,
          y: y - 50,
          alpha: 1,
          width: 100,
          height: 100,
          fill: {
            color: "white",
            alpha: 1,
          },
          children: [],
        });
        selectNewElement();
      } else if (currentTool === ElementType.Text) {
        event.stopPropagation();

        addElement(path, {
          type: ElementType.Text,
          id,
          name: "Text",
          x: x,
          y: y,
          alpha: 1,
          text: "Text",
          style: {
            fontSize: 16,
          },
        });
        selectNewElement();
      }
    },
    [
      container,
      path,
      currentTool,
      setCurrentTool,
      addElement,
      setActiveElementPath,
    ],
  );

  useEffect(() => {
    if (container && !disabled) {
      container.eventMode = "static";

      container.on("pointerdown", handlePointerDown);

      return () => {
        container.off("pointerdown", handlePointerDown);
      };
    }
  }, [container, handlePointerDown, disabled]);
};

export default useAddElement;
