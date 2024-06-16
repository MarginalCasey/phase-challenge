import { Graphics } from "pixi.js";
import type { FC } from "react";
import { useEffect } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IRectangle as RectangleProps } from "../../types";

const Rectangle: FC<RectangleProps> = ({
  x,
  y,
  width,
  height,
  alpha,
  fill,
  stroke,
}) => {
  const stage = usePageStore((state) => state.stage);

  useEffect(() => {
    if (stage) {
      const graphics = new Graphics();
      graphics.rect(x, y, width, height);
      if (fill) {
        graphics.fill(fill);
      }
      if (stroke) {
        graphics.stroke(stroke);
      }
      graphics.alpha = alpha;

      stage.addChild(graphics);
    }
  }, [stage]);

  return null;
};

export default Rectangle;
