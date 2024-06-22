import { Container } from "pixi.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useId, useState } from "react";
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
  const [backgroundWrapper, setBackgroundWrapper] = useState<Container | null>(
    null,
  );

  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const isActive = activeElementPath === path;

  const frameContentId = useId();
  const frameNameId = useId();

  useEffect(() => {
    if (parent) {
      const backgroundWrapper = new Container();
      const container = new Container({
        x,
        y,
        width,
        height,
        alpha,
      });

      container.addChild(backgroundWrapper);
      parent.addChild(container);

      setContainer(container);
      setBackgroundWrapper(backgroundWrapper);

      return () => {
        container.removeChild(backgroundWrapper);
        parent.removeChild(container);
      };
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
          draggable
          dragHandlePosition={{
            x: 0,
            y: -20,
          }}
          text={name}
          x={x}
          y={y - 20}
          alpha={1}
          style={isActive ? activeNameStyle : normalNameStyle}
        />
        <Element
          type={ElementType.Rectangle}
          id={frameContentId}
          name="frame background"
          parent={backgroundWrapper}
          path={path}
          selectable={false}
          outline={false}
          draggable={false}
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
