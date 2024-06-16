import { Container, Graphics, Text } from "pixi.js";
import type { FC } from "react";
import { useEffect, useState } from "react";
import Element from ".";
import usePageStore from "../../hooks/usePageStore";
import type { IFrame } from "../../types";

type FrameProps = IFrame & {
  parent?: Container;
};

const Frame: FC<FrameProps> = ({
  parent,
  name,
  x,
  y,
  width,
  height,
  alpha,
  fill,
  stroke,
  children,
}) => {
  const stage = usePageStore((state) => state.stage);
  const parentContainer = parent ?? stage;

  const [frame, setFrame] = useState<Container | null>(null);

  useEffect(() => {
    if (parentContainer) {
      const container = new Container({
        x,
        y,
        width,
        height,
        alpha,
      });

      const text = new Text({
        text: name,
        x: 0,
        y: -20,
        style: {
          fontSize: 12,
        },
      });

      const graphics = new Graphics();
      graphics.rect(0, 0, width, height);
      graphics.fill(
        fill ?? {
          color: "white",
          alpha: 1,
        },
      );
      if (stroke) {
        graphics.stroke(stroke);
      }
      graphics.alpha = 1;

      container.addChild(text);
      container.addChild(graphics);
      parentContainer.addChild(container);
      setFrame(container);
    }
  }, [parentContainer]);

  if (frame) {
    return children.map((child) => {
      return <Element key={child.id} parent={frame} {...child} />;
    });
  }

  return null;
};

export default Frame;
