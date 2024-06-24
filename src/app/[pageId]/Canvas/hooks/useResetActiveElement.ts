import usePageStore from "@/hooks/usePageStore";
import useToolbarStore, { Tool } from "@/hooks/useToolbarStore";
import { useEffect } from "react";

const useResetActiveElement = () => {
  const stage = usePageStore((state) => state.stage);
  const setActiveElementPath = usePageStore(
    (state) => state.setActiveElementPath,
  );

  const currentTool = useToolbarStore((state) => state.currentTool);

  useEffect(() => {
    function resetActiveElement() {
      setActiveElementPath(null);
    }

    if (stage && currentTool === Tool.Select) {
      stage.on("pointerdown", resetActiveElement);

      return () => {
        stage.off("pointerdown", resetActiveElement);
      };
    }
  }, [stage, currentTool, setActiveElementPath]);
};

export default useResetActiveElement;
