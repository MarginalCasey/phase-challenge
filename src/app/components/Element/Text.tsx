import { Text as PixiText } from "pixi.js";
import type { FC } from "react";
import { useEffect, useState } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IText } from "../../types";
import type { ElementProps } from "./types";

type TextProps = Omit<IText, "type"> & ElementProps;

const Text: FC<TextProps> = ({ parent, x, y, alpha, text, style }) => {
  const [textObj, setTextObj] = useState<PixiText | null>(null);

  const stage = usePageStore((state) => state.stage);
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

  return null;
};

export default Text;
