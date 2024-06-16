import type { Container } from "pixi.js";
import type { FC } from "react";
import type { IElement } from "../../types";
import { ElementType } from "../../types";
import Frame from "./Frame";
import Rectangle from "./Rectangle";

export type ElementProps = IElement & {
  parent?: Container;
  path: string;
};

const Element: FC<ElementProps> = (props) => {
  switch (props.type) {
    case ElementType.Frame:
      return <Frame {...props} />;

    case ElementType.Rectangle:
      return <Rectangle {...props} />;

    default:
      return null;
  }
};

export default Element;
