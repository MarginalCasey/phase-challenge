import { Container, Graphics } from "pixi.js";
import type { FC } from "react";
import { useEffect } from "react";
import usePageStore from "../../hooks/usePageStore";
import type { IRectangle } from "../../types";

type FrameProps = IRectangle & {
  parent?: Container;
};

const Rectangle: FC<FrameProps> = ({
  parent,
  x,
  y,
  width,
  height,
  alpha,
  fill,
  stroke,
}) => {
  const stage = usePageStore((state) => state.stage);
  const parentContainer = parent ?? stage;

  useEffect(() => {
    if (parentContainer) {
      const graphics = new Graphics();
      graphics.rect(x, y, width, height);
      if (fill) {
        graphics.fill(fill);
      }
      if (stroke) {
        graphics.stroke(stroke);
      }
      graphics.alpha = alpha;

      parentContainer.addChild(graphics);
    }
  }, [parentContainer]);

  return null;
};

export default Rectangle;
