import { Text as PixiText } from "pixi.js";
import type { FC } from "react";
import { useEffect } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IText } from "../../types";
import type { ElementProps } from "./index";

type FrameProps = IText & ElementProps;

const Text: FC<FrameProps> = ({ parent, x, y, alpha, text, style }) => {
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

      parentContainer.addChild(textObj);

      return () => {
        parentContainer.removeChild(textObj);
      };
    }
  }, [parentContainer]);

  return null;
};

export default Text;
