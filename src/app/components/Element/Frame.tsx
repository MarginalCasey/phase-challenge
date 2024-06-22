import { Container, Graphics } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useId, useState } from "react";
import Element from ".";
import usePageStore from "../../hooks/usePageStore";
import type { IFrame } from "../../types";
import { ElementType } from "../../types";
import ElementWrapper from "../ElementWrapper";
import type { ElementProps } from "./types";

interface FrameProps extends Omit<IFrame, "type">, ElementProps {
  container: Container | null;
  setContainer: Dispatch<SetStateAction<Container | null>>;
}

const normalNameStyle = {
  fontSize: 12,
  fill: "black",
};

const activeNameStyle = {
  fontSize: 12,
  fill: "#0d99ff",
};

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
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const isActive = activeElementPath === path;

  const [frame, setFrame] = useState<Container | null>(null);
  const frameNameId = useId();

  useEffect(() => {
    if (parent) {
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
      parent.addChild(container);
      setFrame(container);
    }
  }, [parent]);

  if (frame) {
    return (
      <ElementWrapper
        parent={parent}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={stroke}
        visible={isActive}
      >
        <Element
          type={ElementType.Text}
          id={frameNameId}
          name="frame title"
          parent={frame}
          path={path}
          isHandle
          text={name}
          x={0}
          y={-20}
          alpha={1}
          style={isActive ? activeNameStyle : normalNameStyle}
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
