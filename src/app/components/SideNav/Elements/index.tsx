import usePageStore from "@/hooks/usePageStore";
import type { IElement } from "@/types";
import { ElementType } from "@/types";
import type { FC } from "react";
import useFetchPage from "./hooks/useFetchPage";
import FrameIcon from "./icons/FrameIcon";
import RectangleIcon from "./icons/RectangleIcon";
import TextIcon from "./icons/TextIcon";
import { ElementName, IconWrapper, Link } from "./index.style";

interface ElementsProps {
  currentPageId: number;
}

const Elements: FC<ElementsProps> = ({ currentPageId }) => {
  useFetchPage(currentPageId);

  const page = usePageStore((state) => state.page);
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const setActiveElementPath = usePageStore(
    (state) => state.setActiveElementPath,
  );

  function handleClick(path: string) {
    return () => {
      setActiveElementPath(path);
    };
  }

  const renderElement = (
    element: IElement,
    parentPath: string,
    level: number,
  ) => {
    const path = `${parentPath}/${element.id}`;
    const active = path === activeElementPath;

    if ("children" in element) {
      return (
        <div key={element.id}>
          <Link $active={active} $level={level} onClick={handleClick(path)}>
            <IconWrapper>
              {element.type === ElementType.Frame && <FrameIcon />}
            </IconWrapper>
            <ElementName>{element.name}</ElementName>
          </Link>
          {element.children
            .toReversed()
            .map((child) => renderElement(child, path, level + 1))}
        </div>
      );
    }

    return (
      <Link
        key={element.id}
        $active={active}
        $level={level}
        onClick={handleClick(path)}
      >
        <IconWrapper>
          {element.type === ElementType.Text && <TextIcon />}
          {element.type === ElementType.Rectangle && <RectangleIcon />}
        </IconWrapper>
        <ElementName>{element.name}</ElementName>
      </Link>
    );
  };

  return (
    <div>
      {page.toReversed().map((element) => renderElement(element, "", 1))}
    </div>
  );
};

export default Elements;
