import type { Container } from "pixi.js";
import { useEffect } from "react";
import usePageStore from "./usePageStore";

const useSelectableContainer = (container: Container | null, path: string) => {
  const setActiveElementPath = usePageStore(
    (state) => state.setActiveElementPath,
  );

  useEffect(() => {
    if (container) {
      container.eventMode = "static";
      container.on("pointerdown", () => {
        setActiveElementPath(path);
      });
    }
  }, [container]);
};

export default useSelectableContainer;
