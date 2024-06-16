import type { Container } from "pixi.js";
import { Graphics } from "pixi.js";
import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { IStroke } from "../../types";
import { StrokeAlignment } from "../../types";

interface ElementWrapperProps {
  parent: Container | null;
  stroke?: IStroke;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  children?: ReactNode;
}

const ElementWrapper: FC<ElementWrapperProps> = ({
  parent,
  x,
  y,
  width,
  height,
  stroke,
  visible,
  children,
}) => {
  const [border, setBorder] = useState<Graphics | null>(null);

  useEffect(() => {
    if (parent) {
      const borderWidth = 1;
      const strokeWidth = stroke
        ? (stroke.width ?? 1) *
          (1 - (stroke.alignment ?? StrokeAlignment.Default))
        : 0;
      const totalWidth = borderWidth + strokeWidth;

      const borderGraphics = new Graphics();
      borderGraphics.rect(
        x - totalWidth,
        y - totalWidth,
        width + 2 * totalWidth,
        height + 2 * totalWidth,
      );
      borderGraphics.stroke({
        color: "#0d99ff",
        width: borderWidth,
        alignment: 1,
      });
      borderGraphics.visible = false;

      setBorder(borderGraphics);
      parent.addChild(borderGraphics);

      return () => {
        parent.removeChild(borderGraphics);
      };
    }
  }, [parent]);

  useEffect(() => {
    if (border) {
      border.visible = visible;
    }
  }, [border, visible]);

  return children ?? null;
};

export default ElementWrapper;
