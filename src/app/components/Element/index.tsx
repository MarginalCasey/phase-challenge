import type { Container, Graphics, Text as PixiText } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useState } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IElement } from "../../types";
import { ElementType } from "../../types";
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

  const {
    x,
    y,
    parent,
    path,
    outline = true,
    draggable = true,
    dragHandlePosition,
  } = props;
  const parentContainer = parent ?? stage;
  const isSelected = activeElementPath === path;

  useSelectableContainer({
    container,
    path,
    disabled: props.type === ElementType.Frame,
  });
  useSelectionOutline({
    parent: parentContainer,
    container,
    x,
    y,
    stroke: ("stroke" in props && props.stroke) || undefined,
    visible: outline && isSelected,
  });
  useDraggableContainer({
    parent: parentContainer,
    container,
    path,
    handlePosition: dragHandlePosition,
    disabled: props.type === ElementType.Frame || !draggable,
  });

  useEffect(() => {
    if (container) {
      container.position.set(x, y);
    }
  }, [container, x, y]);

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
