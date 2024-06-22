import type { Container } from "pixi.js";
import { Graphics } from "pixi.js";
import { useEffect, useState } from "react";

interface UseSelectionOutlineProps {
  parent: Container | null;
  container: Container | null;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

const useSelectionOutline = ({
  parent,
  container,
  x,
  y,
  width,
  height,
  visible,
}: UseSelectionOutlineProps) => {
  const [border, setBorder] = useState<Graphics | null>(null);

  useEffect(() => {
    if (parent && container) {
      const borderWidth = 1;

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
  }, [parent, container, width, height]);

  useEffect(() => {
    if (border) {
      border.visible = visible;
      border.x = x;
      border.y = y;
    }
  }, [border, visible, x, y]);
};

export default useSelectionOutline;
