import usePageStore from "@/hooks/usePageStore";
import useToolbarStore, { Tool } from "@/hooks/useToolbarStore";
import type { IElement } from "@/types";
import { ElementType } from "@/types";
import type { Container, Graphics, Text as PixiText } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useState } from "react";
import Frame from "./Frame";
import Rectangle from "./Rectangle";
import Text from "./Text";
import useDraggableContainer from "./hooks/useDraggableContainer";
import useSelectableContainer from "./hooks/useSelectableContainer";
import useSelectionOutline from "./hooks/useSelectionOutline";
import type { ElementProps } from "./types";

const Element: FC<IElement & ElementProps> = (props) => {
  const [container, setContainer] = useState<Container | null>(null);

  const stage = usePageStore((state) => state.stage);
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const setActiveElement = usePageStore((state) => state.setActiveElement);
  const currentTool = useToolbarStore((state) => state.currentTool);

  const {
    x,
    y,
    alpha,
    parent,
    path,
    outline = true,
    selectable = true,
    draggable = true,
    dragHandlePosition,
  } = props;
  const parentContainer = parent ?? stage;
  const isSelected = activeElementPath === path;
  const strokeWidth = "stroke" in props ? props.stroke?.width ?? 1 : 0;

  useSelectableContainer({
    container,
    path,
    disabled:
      props.type === ElementType.Frame ||
      !selectable ||
      currentTool !== Tool.Select,
  });
  useSelectionOutline({
    parent: parentContainer,
    container,
    x,
    y,
    width:
      "width" in props
        ? props.width
        : container
          ? container.width - strokeWidth
          : 0, // fix PIXI calculation
    height:
      "height" in props
        ? props.height
        : container
          ? container.height - strokeWidth
          : 0,
    visible: outline && isSelected,
  });
  useDraggableContainer({
    parent: parentContainer,
    container,
    path,
    handlePosition: dragHandlePosition,
    disabled:
      props.type === ElementType.Frame ||
      !draggable ||
      currentTool !== Tool.Select,
  });

  useEffect(() => {
    if (container) {
      container.position.set(x, y);
      container.alpha = alpha;
    }
  }, [container, x, y, alpha]);

  useEffect(() => {
    if (container && isSelected) {
      setActiveElement(container);
    }
  }, [container, isSelected, setActiveElement]);

  switch (props.type) {
    case ElementType.Frame:
      return (
        <Frame
          {...props}
          parent={parentContainer}
          container={container}
          setContainer={setContainer}
        />
      );

    case ElementType.Text:
      return (
        <Text
          {...props}
          parent={parentContainer}
          container={container as PixiText}
          setContainer={
            setContainer as Dispatch<SetStateAction<PixiText | null>>
          }
        />
      );

    case ElementType.Rectangle:
      return (
        <Rectangle
          {...props}
          parent={parentContainer}
          container={container as Graphics}
          setContainer={
            setContainer as Dispatch<SetStateAction<Graphics | null>>
          }
        />
      );

    default:
      return null;
  }
};

export default Element;
