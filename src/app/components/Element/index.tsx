import type { FC } from "react";
import type { IElement } from "../../types";
import { ElementType } from "../../types";
import Frame from "./Frame";
import Rectangle from "./Rectangle";
import Text from "./Text";
import type { ElementProps } from "./types";

const Element: FC<IElement & ElementProps> = (props) => {
  switch (props.type) {
    case ElementType.Frame:
      return <Frame {...props} />;

    case ElementType.Text:
      return <Text {...props} />;

    case ElementType.Rectangle:
      return <Rectangle {...props} />;

    default:
      return null;
  }
};

export default Element;
