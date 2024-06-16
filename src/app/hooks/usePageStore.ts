import { produce } from "immer";
import type { Container } from "pixi.js";
import { create } from "zustand";
import { ElementType, IElement } from "../types";

interface PageState {
  stage: Container | null;
  setStage: (stage: Container) => void;
  page: IElement[];
  activeElementPath: string | null;
  setActiveElementPath: (path: string) => void;
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
        width: 2,
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
}));

export default usePageStore;
