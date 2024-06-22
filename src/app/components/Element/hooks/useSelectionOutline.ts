import type { Container } from "pixi.js";
import { Graphics } from "pixi.js";
import { useEffect, useState } from "react";
import type { IStroke } from "../../../types";

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
      const borderWidth = 1;
      const strokeWidth = stroke ? stroke.width ?? 1 : 0;

      const width = container.width - strokeWidth; // fix PIXI calculation
      const height = container.height - strokeWidth;

      const borderGraphics = new Graphics();
      borderGraphics.position.set(x, y);

      borderGraphics.rect(0, 0, width, height);
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
