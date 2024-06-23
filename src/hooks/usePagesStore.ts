import { pages } from "@/mockData";
import { produce } from "immer";
import localforage from "localforage";
import { create } from "zustand";

export interface IPageListItem {
  id: number;
  name: string;
}

interface PagesState {
  pages: IPageListItem[];
  fetchPages: () => void;
  updatePageName: (idStr: string, name: string) => void;
}

async function fetchPages() {
  const data = await localforage.getItem<IPageListItem[]>("pages");

  return data ?? pages.map((page) => ({ id: page.id, name: page.name }));
}

function updatePages(pages: IPageListItem[]) {
  localforage.setItem("pages", pages);
}

const usePagesStore = create<PagesState>((set, get) => ({
  pages: [],
  fetchPages: async () => {
    const data = await fetchPages();

    set(
      produce((state) => {
        state.pages = data;
      }),
    );
  },
  updatePageName: (idStr: string, name: string) => {
    set(
      produce((state: PagesState) => {
        const page = state.pages.find((page) => page.id === Number(idStr));
        if (page) {
          page.name = name;
        }
      }),
    );

    const updatedPages = get().pages;
    updatePages(updatedPages);
  },
}));

export default usePagesStore;
