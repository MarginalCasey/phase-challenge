import type { IText } from "@/types";
import { Text as PixiText } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import type { ElementProps } from "./types";

interface TextProps extends Omit<IText, "type">, ElementProps {
  container: PixiText | null;
  setContainer: Dispatch<SetStateAction<PixiText | null>>;
}

const Text: FC<TextProps> = ({
  parent,
  x,
  y,
  alpha,
  text,
  style,
  container,
  setContainer,
}) => {
  useEffect(() => {
    if (parent) {
      const textObj = new PixiText({
        text,
        x,
        y,
        alpha,
        style,
      });

      setContainer(textObj);
      parent.addChild(textObj);

      return () => {
        parent.removeChild(textObj);
      };
    }
  }, [parent]);

  useEffect(() => {
    if (container) {
      container.style = style;
    }
  }, [container, style]);

  return null;
};

export default Text;
