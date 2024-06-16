import { produce } from "immer";
import type { Container } from "pixi.js";
import { create } from "zustand";
import { ElementType, IElement } from "../types";

interface PageState {
  stage: Container | null;
  setStage: (stage: Container) => void;
  page: IElement[];
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
      type: ElementType.Rectangle,
      id: "1",
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
      type: ElementType.Rectangle,
      id: "2",
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
}));

export default usePageStore;
