import type { Container, Graphics, Text as PixiText } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IElement } from "../../types";
import { ElementType } from "../../types";
import Frame from "./Frame";
import Rectangle from "./Rectangle";
import Text from "./Text";
import useSelectableContainer from "./hooks/useSelectableContainer";
import type { ElementProps } from "./types";

const Element: FC<IElement & ElementProps> = (props) => {
  const { parent, path } = props;

  const stage = usePageStore((state) => state.stage);
  const parentContainer = parent ?? stage;

  const [container, setContainer] = useState<Container | null>(null);
  useSelectableContainer(container, path);

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
