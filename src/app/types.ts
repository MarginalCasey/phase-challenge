export type ElementId = string;

export enum ElementType {
  Frame = "frame",
  Rectangle = "rectangle",
}

interface IElementCommonProps {
  id: ElementId;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
}

interface Ifill {
  color?: string;
  alpha?: number;
}

interface IStroke {
  width?: number;
  color?: string;
  alpha?: number;
}

export interface IRectangle extends IElementCommonProps {
  type: ElementType.Rectangle;
  fill?: Ifill;
  stroke?: IStroke;
}

export type IGraphic = IRectangle;

export interface IFrame extends IElementCommonProps {
  type: ElementType.Frame;
  fill?: Ifill;
  stroke?: IStroke;
  children: IElement[];
}

export type IElement = IFrame | IGraphic;
