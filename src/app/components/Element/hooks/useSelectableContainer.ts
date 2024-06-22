import type { Container } from "pixi.js";
import { useEffect } from "react";
import usePageStore from "../../../hooks/usePageStore";

interface UseSelectableContainerProps {
  container: Container | null;
  path: string;
  disabled?: boolean;
}

const useSelectableContainer = ({
  container,
  path,
  disabled,
}: UseSelectableContainerProps) => {
  const setActiveElementPath = usePageStore(
    (state) => state.setActiveElementPath,
  );

  useEffect(() => {
    if (container && !disabled) {
      container.eventMode = "static";
      container.on("pointerdown", () => {
        setActiveElementPath(path);
      });
    }
  }, [container, disabled]);
};

export default useSelectableContainer;
