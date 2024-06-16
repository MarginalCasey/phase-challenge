export enum ElementType {
  Frame = "frame",
  Text = "text",
  Rectangle = "rectangle",
}

interface Ifill {
  color?: string;
  alpha?: number;
}

export enum StrokeAlignment {
  Default = 1,
  Inner = 1,
  Center = 0.5,
  Outer = 0,
}

export interface IStroke {
  width?: number;
  color?: string;
  alpha?: number;
  alignment?: StrokeAlignment;
}

interface IElementCommonProps {
  id: string;
  name: string;
  x: number;
  y: number;
  alpha: number;
}

interface IBlockElementCommonProps extends IElementCommonProps {
  width: number;
  height: number;
}

interface ITextStyle {
  fontSize: number;
}

export interface IText extends IElementCommonProps {
  type: ElementType.Text;
  text: string;
  style: ITextStyle;
}

export interface IRectangle extends IBlockElementCommonProps {
  type: ElementType.Rectangle;
  fill?: Ifill;
  stroke?: IStroke;
}

export type IGraphic = IRectangle;

export interface IFrame extends IBlockElementCommonProps {
  type: ElementType.Frame;
  fill?: Ifill;
  stroke?: IStroke;
  children: IElement[];
}

export type IElement = IFrame | IText | IGraphic;
