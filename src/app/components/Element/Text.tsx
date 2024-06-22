import { Text as PixiText } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IText } from "../../types";
import ElementWrapper from "../ElementWrapper";
import type { ElementProps } from "./types";

interface TextProps extends Omit<IText, "type">, ElementProps {
  container: PixiText | null;
  setContainer: Dispatch<SetStateAction<PixiText | null>>;
}

const Text: FC<TextProps> = ({
  parent,
  path,
  isHandle,
  x,
  y,
  alpha,
  text,
  style,
  container,
  setContainer,
}) => {
  const activeElementPath = usePageStore((state) => state.activeElementPath);

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

  if (container && !isHandle) {
    return (
      <ElementWrapper
        parent={parent}
        x={x}
        y={y}
        width={container.width}
        height={container.height}
        visible={activeElementPath === path}
      />
    );
  }

  return null;
};

export default Text;
