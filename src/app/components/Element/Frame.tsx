import { Container } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useId } from "react";
import Element from ".";
import usePageStore from "../../hooks/usePageStore";
import type { IFrame } from "../../types";
import { ElementType } from "../../types";
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
  container,
  setContainer,
}) => {
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const isActive = activeElementPath === path;

  const frameContentId = useId();
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

      parent.addChild(container);
      setContainer(container);
    }
  }, [parent]);

  if (container) {
    return (
      <>
        <Element
          type={ElementType.Text}
          id={frameNameId}
          name="frame title"
          parent={null}
          path={path}
          outline={false}
          text={name}
          x={x}
          y={x - 20}
          alpha={1}
          style={isActive ? activeNameStyle : normalNameStyle}
        />
        <Element
          type={ElementType.Rectangle}
          id={frameContentId}
          name="frame content"
          parent={container}
          path={path}
          outline={false}
          x={0}
          y={0}
          width={width}
          height={height}
          alpha={1}
          fill={
            fill ?? {
              color: "white",
              alpha: 1,
            }
          }
          stroke={stroke}
        />
        {children.map((child) => {
          return (
            <Element
              key={child.id}
              parent={container}
              path={`${path}/${child.id}`}
              {...child}
            />
          );
        })}
      </>
    );
  }

  return null;
};

export default Frame;
