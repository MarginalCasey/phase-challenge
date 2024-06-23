import { produce } from "immer";
import type { Container } from "pixi.js";
import { create } from "zustand";
import { DEFAULT_FILL, DEFAULT_STROKE } from "../constants";
import { ElementType, IElement, IStroke, Ifill } from "../types";

interface EditableProps {
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
  fill: Partial<Ifill>;
  stroke: Partial<IStroke>;
}

interface PageState {
  stage: Container | null;
  setStage: (stage: Container) => void;
  page: IElement[];
  activeElementPath: string | null;
  setActiveElementPath: (path: string) => void;
  activeElement: Container | null;
  setActiveElement: (element: Container) => void;
  setElement: (path: string, update: Partial<EditableProps>) => void;
}

const usePageStore = create<PageState>((set) => ({
  stage: null,
  setStage: (stage) =>
    set(
      produce((state) => {
        state.stage = stage;
      }),
    ),
  page: [
    {
      type: ElementType.Frame,
      id: "0",
      name: "Frame 1",
      x: 200,
      y: 200,
      width: 300,
      height: 200,
      alpha: 1,
      fill: {
        color: "lightblue",
      },
      children: [
        {
          type: ElementType.Rectangle,
          id: "1",
          name: "Rectangle 1",
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          alpha: 1,
          fill: {
            color: "red",
            alpha: 0.2,
          },
        },
        {
          type: ElementType.Text,
          id: "4",
          name: "Text 1",
          x: 5,
          y: 5,
          alpha: 1,
          text: "Text 1",
          style: {
            fontSize: 24,
          },
        },
      ],
    },
    {
      type: ElementType.Rectangle,
      id: "2",
      name: "Rectangle 2",
      x: 200,
      y: 50,
      width: 100,
      height: 100,
      alpha: 0.5,
      fill: {
        color: "red",
      },
      stroke: {
        color: "black",
        width: 5,
      },
    },
    {
      type: ElementType.Rectangle,
      id: "3",
      name: "Rectangle 3",
      x: 400,
      y: 50,
      width: 100,
      height: 100,
      alpha: 1,
      fill: {
        color: "red",
      },
    },
    {
      type: ElementType.Rectangle,
      id: "4",
      name: "Rectangle 4",
      x: 600,
      y: 50,
      width: 100,
      height: 100,
      alpha: 1,
      stroke: {
        alignment: 0,
        color: "black",
        width: 5,
      },
    },
  ],
  activeElementPath: null,
  setActiveElementPath: (path) => {
    set(
      produce((state) => {
        state.activeElementPath = path;
      }),
    );
  },
  activeElement: null,
  setActiveElement: (element) => {
    set(
      produce((state) => {
        state.activeElement = element;
      }),
    );
  },
  setElement: (path: string, properties: Partial<EditableProps>) => {
    const { x, y, alpha, width, height, fill, stroke } = properties;
    const idArr = path.split("/");
    idArr.shift();

    set(
      produce((state) => {
        let list: IElement[] = state.page;
        let element: IElement | null = null;

        while (idArr.length > 0) {
          const id = idArr.shift();

          element = list.find((child) => child.id === id) ?? null;
          if (element === null) break;
          if ("children" in element) {
            list = element.children;
          } else {
            list = [];
          }
        }

        if (element) {
          if (x !== undefined) element.x = x;
          if (y !== undefined) element.y = y;
          if (alpha !== undefined) element.alpha = alpha;

          if (
            element.type === ElementType.Frame ||
            element.type === ElementType.Rectangle
          ) {
            if (width !== undefined) {
              element.width = width;
            }
            if (height !== undefined) {
              element.height = height;
            }
            if (fill !== undefined) {
              element.fill = {
                ...DEFAULT_FILL,
                ...element.fill,
              };
              if (fill.color !== undefined) {
                element.fill.color = fill.color;
              }
              if (fill.alpha !== undefined) {
                element.fill.alpha = fill.alpha;
              }
            }
            if (stroke !== undefined) {
              element.stroke = {
                ...DEFAULT_STROKE,
                ...element.stroke,
              };

              if (stroke.color !== undefined) {
                element.stroke.color = stroke.color;
              }
              if (stroke.alpha !== undefined) {
                element.stroke.alpha = stroke.alpha;
              }
              if (stroke.width !== undefined) {
                element.stroke.width = stroke.width;
              }
              if (stroke.alignment !== undefined) {
                element.stroke.alignment = stroke.alignment;
              }
            }
          }
        }
      }),
    );
  },
}));

export default usePageStore;
