import type { Container } from "pixi.js";
import { Graphics } from "pixi.js";
import { useEffect, useState } from "react";
import type { IStroke } from "../../../types";
import { StrokeAlignment } from "../../../types";

interface UseSelectionOutlineProps {
  parent: Container | null;
  container: Container | null;
  x: number;
  y: number;
  stroke?: IStroke;
  visible: boolean;
}

const useSelectionOutline = ({
  parent,
  container,
  x,
  y,
  stroke,
  visible,
}: UseSelectionOutlineProps) => {
  const [border, setBorder] = useState<Graphics | null>(null);

  useEffect(() => {
    if (parent && container) {
      const width = container.width;
      const height = container.height;

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
  }, [parent, container]);

  useEffect(() => {
    if (border) {
      border.visible = visible;
    }
  }, [border, visible]);
};

export default useSelectionOutline;
