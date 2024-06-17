import type { Container } from "pixi.js";
import { Graphics } from "pixi.js";
import type { FC } from "react";
import { useEffect, useState } from "react";
import usePageStore from "../../hooks/usePageStore";
import useSelectableContainer from "../../hooks/useSelectableContainer";
import type { IRectangle } from "../../types";
import { StrokeAlignment } from "../../types";
import ElementWrapper from "../ElementWrapper";
import type { ElementProps } from "./types";

type RectangleProps = Omit<IRectangle, "type"> & ElementProps;

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
}) => {
  const stage = usePageStore((state) => state.stage);
  const activeElementPath = usePageStore((state) => state.activeElementPath);

  const parentContainer = parent ?? stage;

  const [graphics, setGraphics] = useState<Container | null>(null);
  useSelectableContainer(graphics, path);

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
      setGraphics(graphics);

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
