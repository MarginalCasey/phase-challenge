import usePageStore from "@/hooks/usePageStore";
import type { Container } from "pixi.js";
import { useEffect } from "react";

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
    function onPointerDown() {
      setActiveElementPath(path);
    }

    if (container && !disabled) {
      container.eventMode = "static";
      container.on("pointerdown", onPointerDown);

      return () => {
        container.off("pointerdown", onPointerDown);
      };
    }
  }, [container, path, disabled, setActiveElementPath]);
};

export default useSelectableContainer;
