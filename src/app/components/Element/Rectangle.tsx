import { Graphics } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IRectangle } from "../../types";
import { StrokeAlignment } from "../../types";
import ElementWrapper from "../ElementWrapper";
import type { ElementProps } from "./types";

interface RectangleProps extends Omit<IRectangle, "type">, ElementProps {
  container: Graphics | null;
  setContainer: Dispatch<SetStateAction<Graphics | null>>;
}

const Rectangle: FC<RectangleProps> = ({
  parent,
  path,
  x,
  y,
  width,
  height,
  alpha,
  fill,
  stroke,
  setContainer,
}) => {
  const activeElementPath = usePageStore((state) => state.activeElementPath);

  useEffect(() => {
    if (parent) {
      const graphics = new Graphics();
      graphics.rect(x, y, width, height);
      if (fill) {
        graphics.fill(fill);
      }
      if (stroke) {
        graphics.stroke({
          alignment: StrokeAlignment.Default,
          ...stroke,
        });
      }
      graphics.alpha = alpha;

      parent.addChild(graphics);
      setContainer(graphics);

      return () => {
        parent.removeChild(graphics);
      };
    }
  }, [parent]);

  return (
    <ElementWrapper
      parent={parent}
      x={x}
      y={y}
      width={width}
      height={height}
      stroke={stroke}
      visible={activeElementPath === path}
    />
  );
};

export default Rectangle;
