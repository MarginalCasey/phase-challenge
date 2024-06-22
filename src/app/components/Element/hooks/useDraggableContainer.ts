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
  container,
  path,
  handlePosition,
  disabled,
}: UseDraggableContainerProps) => {
  const stage = usePageStore((state) => state.stage);
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
    (container: Container) => {
      return (event: FederatedPointerEvent) => {
        const { x, y } = event.getLocalPosition(container);

        dragTargetRef.current = container;
        dragTargetRef.current.alpha = 0.5;
        offsetRef.current = { x, y };

        if (stage) {
          stage.on("pointermove", onDragMove);
        }
      };
    },
    [stage, onDragMove],
  );

  const onDragEnd = useCallback(() => {
    if (dragTargetRef.current) {
      if (stage) {
        stage.off("pointermove", onDragMove);
      }

      dragTargetRef.current.alpha = 1;
      dragTargetRef.current = null;
      offsetRef.current = { x: 0, y: 0 };
    }
  }, [stage, onDragMove]);

  useEffect(() => {
    if (stage && container && !disabled) {
      container.eventMode = "static";

      const onPointerDown = onDragStart(container);
      container.on("pointerdown", onPointerDown);
      stage.on("pointerup", onDragEnd);
      stage.on("pointerupoutside", onDragEnd);

      return () => {
        container.off("pointerdown", onPointerDown);
        stage.off("pointermove", onDragMove);
        stage.off("pointerup", onDragEnd);
        stage.off("pointerupoutside", onDragEnd);
      };
    }
  }, [stage, container, disabled, onDragStart, onDragMove, onDragEnd]);
};

export default useDraggableContainer;
