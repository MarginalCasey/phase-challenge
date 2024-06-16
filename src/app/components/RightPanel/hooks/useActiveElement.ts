import { useMemo } from "react";
import usePageStore from "../../../hooks/usePageStore";
import type { IElement } from "../../../types";

const useActiveElement = () => {
  const page = usePageStore((state) => state.page);
  const activeElementPath = usePageStore((state) => state.activeElementPath);

  const element = useMemo(() => {
    if (activeElementPath === null) return null;

    let list: IElement[] = page;
    let element: IElement | null = null;

    const idArr = activeElementPath.split("/");
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
  }, [page, activeElementPath]);

  return element;
};

export default useActiveElement;
