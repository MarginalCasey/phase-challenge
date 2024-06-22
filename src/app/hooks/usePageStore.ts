import { produce } from "immer";
import type { Container } from "pixi.js";
import { create } from "zustand";
import { ElementType, IElement } from "../types";

interface EditableProps {
  x: number;
  y: number;
  width: number;
  height: number;
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
            color: "0xde3249",
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
      alpha: 1,
      fill: {
        color: "0xde3249",
      },
      stroke: {
        color: "0x650a5a",
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
        color: "0xde3249",
      },
      stroke: {
        alignment: 0,
        color: "0x650a5a",
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
    const { x, y, width, height } = properties;
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
          if ("width" in element && width !== undefined) {
            element.width = width;
          }
          if ("height" in element && height !== undefined) {
            element.height = height;
          }
        }
      }),
    );
  },
}));

export default usePageStore;
