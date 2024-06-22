import { Graphics } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import type { IRectangle } from "../../types";
import { StrokeAlignment } from "../../types";
import type { ElementProps } from "./types";

interface RectangleProps extends Omit<IRectangle, "type">, ElementProps {
  container: Graphics | null;
  setContainer: Dispatch<SetStateAction<Graphics | null>>;
}

const Rectangle: FC<RectangleProps> = ({
  parent,
  x,
  y,
  width,
  height,
  alpha,
  fill,
  stroke,
  setContainer,
}) => {
  useEffect(() => {
    if (parent) {
      const graphics = new Graphics();
      graphics.position.set(x, y);
      graphics.alpha = alpha;

      graphics.rect(0, 0, width, height);
      if (fill) {
        graphics.fill(fill);
      }
      if (stroke) {
        graphics.stroke({
          alignment: StrokeAlignment.Inner,
          ...stroke,
        });
      }

      parent.addChild(graphics);
      setContainer(graphics);

      return () => {
        parent.removeChild(graphics);
      };
    }
  }, [parent, width, height]);

  return null;
};

export default Rectangle;
