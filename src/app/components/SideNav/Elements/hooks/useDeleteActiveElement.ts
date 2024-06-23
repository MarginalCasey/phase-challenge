import usePageStore from "@/hooks/usePageStore";
import { useEffect } from "react";

const useDeleteActiveElement = () => {
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const deleteElement = usePageStore((state) => state.deleteElement);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const activeElement = document.activeElement;

      if (activeElement && activeElement !== document.body) {
        return;
      }

      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        activeElementPath
      ) {
        deleteElement(activeElementPath);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeElementPath, deleteElement]);
};

export default useDeleteActiveElement;
