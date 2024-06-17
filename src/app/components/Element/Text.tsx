import { Text as PixiText } from "pixi.js";
import type { FC } from "react";
import { useEffect, useState } from "react";
import usePageStore from "../../hooks/usePageStore";
import useSelectableContainer from "../../hooks/useSelectableContainer";
import type { IText } from "../../types";
import ElementWrapper from "../ElementWrapper";
import type { ElementProps } from "./types";

type TextProps = Omit<IText, "type"> & ElementProps;

const Text: FC<TextProps> = ({ parent, path, x, y, alpha, text, style }) => {
  const [textObj, setTextObj] = useState<PixiText | null>(null);
  useSelectableContainer(textObj, path);

  const stage = usePageStore((state) => state.stage);
  const activeElementPath = usePageStore((state) => state.activeElementPath);

  const parentContainer = parent ?? stage;

  useEffect(() => {
    if (parentContainer) {
      const textObj = new PixiText({
        text,
        x,
        y,
        alpha,
        style,
      });

      setTextObj(textObj);
      parentContainer.addChild(textObj);

      return () => {
        parentContainer.removeChild(textObj);
      };
    }
  }, [parentContainer]);

  useEffect(() => {
    if (textObj) {
      textObj.style = style;
    }
  }, [textObj, style]);

  if (textObj) {
    return (
      <ElementWrapper
        parent={parentContainer}
        x={x}
        y={y}
        width={textObj.width}
        height={textObj.height}
        visible={activeElementPath === path}
      />
    );
  }

  return null;
};

export default Text;
