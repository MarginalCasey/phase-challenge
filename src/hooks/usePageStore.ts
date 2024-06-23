import { pages } from "@/mockData";
import { produce } from "immer";
import localforage from "localforage";
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
  id: number | null;
  page: IElement[];
  stage: Container | null;
  activeElementPath: string | null;
  activeElement: Container | null;
  fetchPage: (id: number) => void;
  addElement: (parentPath: string | null, element: IElement) => void;
  updateElementName: (path: string, name: string) => void;
  setStage: (stage: Container) => void;
  setActiveElementPath: (path: string) => void;
  setActiveElement: (element: Container) => void;
  setElement: (path: string, update: Partial<EditableProps>) => void;
}

async function fetchPage(id: number): Promise<IElement[]> {
  const data = await localforage.getItem<IElement[]>(`page.${id}`);

  return data ?? pages.find((page) => page.id === id)?.elements ?? [];
}

function updatePage(id: number, page: IElement[]) {
  localforage.setItem(`page.${id}`, page);
}

function getElement(page: IElement[], path: string) {
  let list: IElement[] = page;
  let element: IElement | null = null;

  const idArr = path.split("/");
  idArr.shift();

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

  return element;
}

const initialState = {
  id: null,
  page: [],
  stage: null,
  activeElementPath: null,
  activeElement: null,
};

const usePageStore = create<PageState>((set, get) => ({
  ...initialState,
  fetchPage: async (id: number) => {
    set(
      produce((state) => {
        state.id = initialState.id;
        state.page = initialState.page;
        state.stage = initialState.stage;
        state.activeElementPath = initialState.activeElementPath;
        state.activeElement = initialState.activeElement;
      }),
    );

    const page = await fetchPage(id);

    set(
      produce((state) => {
        state.id = id;
        state.page = page;
      }),
    );
  },
  addElement: (parentPath, element) => {
    set(
      produce<PageState>((state) => {
        if (parentPath === null) {
          state.page.push(element);
        } else {
          const parent = getElement(state.page, parentPath);

          if (parent && "children" in parent) {
            parent.children.push(element);
          }
        }
      }),
    );

    const { id, page } = get();
    updatePage(id as number, page);
  },
  updateElementName: (path: string, name: string) => {
    set(
      produce<PageState>((state) => {
        const element = getElement(state.page, path);

        if (element) {
          element.name = name;
        }
      }),
    );

    const { id, page } = get();
    updatePage(id as number, page);
  },
  setStage: (stage: Container) =>
    set(
      produce((state) => {
        state.stage = stage;
      }),
    ),
  setActiveElementPath: (path) => {
    set(
      produce((state) => {
        state.activeElementPath = path;
      }),
    );
  },
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
        const element = getElement(state.page, path);

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

    const { id, page } = get();
    updatePage(id as number, page);
  },
}));

export default usePageStore;
