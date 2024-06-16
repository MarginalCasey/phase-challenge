import type { FC } from "react";
import type { IElement as ElementProps } from "../../types";
import { ElementType } from "../../types";
import Rectangle from "./Rectangle";

const Element: FC<ElementProps> = (props) => {
  if (props.type === ElementType.Rectangle) {
    return <Rectangle {...props} />;
  }

  return null;
};

export default Element;
