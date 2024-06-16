import { Container, Graphics } from "pixi.js";
import type { FC } from "react";
import { useEffect, useId, useState } from "react";
import Element from ".";
import usePageStore from "../../hooks/usePageStore";
import type { IFrame } from "../../types";
import ElementWrapper from "../ElementWrapper";
import Text from "./Text";
import type { ElementProps } from "./types";

type FrameProps = Omit<IFrame, "type"> & ElementProps;

const Frame: FC<FrameProps> = ({
  parent,
  path,
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
  const activeElementPath = usePageStore((state) => state.activeElementPath);

  const parentContainer = parent ?? stage;

  const [frame, setFrame] = useState<Container | null>(null);
  const frameNameId = useId();

  useEffect(() => {
    if (parentContainer) {
      const container = new Container({
        x,
        y,
        width,
        height,
        alpha,
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

      container.addChild(graphics);
      parentContainer.addChild(container);
      setFrame(container);
    }
  }, [parentContainer]);

  if (frame) {
    return (
      <ElementWrapper
        parent={parentContainer}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={stroke}
        visible={activeElementPath === path}
      >
        <Text
          id={frameNameId}
          name="frame title"
          parent={frame}
          path={path}
          text={name}
          x={0}
          y={-20}
          alpha={1}
          style={{
            fontSize: 12,
          }}
        />
        {children.map((child) => {
          return (
            <Element
              key={child.id}
              parent={frame}
              path={`${path}/${child.id}`}
              {...child}
            />
          );
        })}
      </ElementWrapper>
    );
  }

  return null;
};

export default Frame;
