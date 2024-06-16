export enum ElementType {
  Rectangle = "rectangle",
}

interface IElementCommonProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
}

export interface IRectangle extends IElementCommonProps {
  type: ElementType.Rectangle;
  fill?: {
    color?: string;
    alpha?: number;
  };
  stroke?: {
    width?: number;
    color?: string;
    alpha?: number;
  };
}

export type IGraphic = IRectangle;

export type IElement = IGraphic;
