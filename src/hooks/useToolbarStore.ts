import { ElementType } from "@/types";
import { create } from "zustand";

export enum Tool {
  Select = "select",
}

type CurrentTool = Tool | ElementType;

interface ToolbarState {
  currentTool: CurrentTool;
  setCurrentTool: (tool: CurrentTool) => void;
}

const useToolbarStore = create<ToolbarState>((set) => ({
  currentTool: Tool.Select,
  setCurrentTool: (tool: CurrentTool) => set({ currentTool: tool }),
}));

export default useToolbarStore;
