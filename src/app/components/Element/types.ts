import type { Container } from "pixi.js";

export interface ElementProps {
  parent?: Container | null;
  path: string;
  disableOutline?: boolean;
}
