import type { Container } from "pixi.js";

export interface ElementProps {
  parent?: Container | null;
  path: string;
  outline?: boolean;
  selectable?: boolean;
  draggable?: boolean;
  dragHandlePosition?: { x: number; y: number };
  enableAddElementOnClick?: boolean;
}
