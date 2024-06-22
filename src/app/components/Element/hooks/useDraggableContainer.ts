import type { Container, FederatedPointerEvent } from "pixi.js";
import { useCallback, useEffect, useRef } from "react";
import usePageStore from "../../../hooks/usePageStore";

interface UseDraggableContainerProps {
  parent: Container | null;
  container: Container | null;
  path: string;
  handlePosition?: { x: number; y: number };
  disabled: boolean;
}

const useDraggableContainer = ({
  parent,
  container,
  path,
  handlePosition,
  disabled,
}: UseDraggableContainerProps) => {
  const setElement = usePageStore((state) => state.setElement);
  const dragTargetRef = useRef<Container | null>(null);
  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onDragMove = useCallback(
    (event: FederatedPointerEvent) => {
      if (dragTargetRef.current && offsetRef.current) {
        const { parent } = dragTargetRef.current;

        const { x, y } = parent.toLocal(event.global);
        const offset = offsetRef.current;

        setElement(path, {
          x: x - offset.x - (handlePosition?.x ?? 0),
          y: y - offset.y - (handlePosition?.y ?? 0),
        });
      }
    },
    [path, handlePosition?.x, handlePosition?.y, setElement],
  );

  const onDragStart = useCallback(
    (parent: Container, container: Container) => {
      return (event: FederatedPointerEvent) => {
        const { x, y } = event.getLocalPosition(container);

        dragTargetRef.current = container;
        dragTargetRef.current.alpha = 0.5;
        offsetRef.current = { x, y };

        parent.on("pointermove", onDragMove);
      };
    },
    [onDragMove],
  );

  const onDragEnd = useCallback(
    (parent: Container) => {
      return () => {
        if (dragTargetRef.current) {
          parent.off("pointermove", onDragMove);
          dragTargetRef.current.alpha = 1;
          dragTargetRef.current = null;
          offsetRef.current = { x: 0, y: 0 };
        }
      };
    },
    [onDragMove],
  );

  useEffect(() => {
    if (parent && container && !disabled) {
      parent.eventMode = "static";
      container.eventMode = "static";

      const onPointerDown = onDragStart(parent, container);
      container.on("pointerdown", onPointerDown);
      parent.on("pointerup", onDragEnd(parent));
      parent.on("pointerupoutside", onDragEnd(parent));

      return () => {
        container.off("pointerdown", onPointerDown);
        parent.off("pointermove", onDragMove);
        parent.off("pointerup", onDragEnd(parent));
        parent.off("pointerupoutside", onDragEnd(parent));
      };
    }
  }, [parent, container, disabled, onDragStart, onDragMove, onDragEnd]);
};

export default useDraggableContainer;
