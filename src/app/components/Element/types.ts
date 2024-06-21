import type { Container } from "pixi.js";

export interface ElementProps {
  parent?: Container;
  path: string;
  isHandle?: boolean;
}
