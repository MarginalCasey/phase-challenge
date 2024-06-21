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
  const stage = usePageStore((state) => state.stage);
  const activeElementPath = usePageStore((state) => state.activeElementPath);

  const parentContainer = parent ?? stage;

  useEffect(() => {
    if (parentContainer) {
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

      parentContainer.addChild(graphics);
      setContainer(graphics);

      return () => {
        parentContainer.removeChild(graphics);
      };
    }
  }, [parentContainer]);

  return (
    <ElementWrapper
      parent={parentContainer}
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
