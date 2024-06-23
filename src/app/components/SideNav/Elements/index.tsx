import usePageStore from "@/hooks/usePageStore";
import type { IElement } from "@/types";
import { ElementType } from "@/types";
import type { FC } from "react";
import { useRef, useState } from "react";
import FrameIcon from "../../../../icons/FrameIcon";
import RectangleIcon from "../../../../icons/RectangleIcon";
import TextIcon from "../../../../icons/TextIcon";
import NameInput from "../components/NameInput";
import useFetchPage from "./hooks/useFetchPage";
import { ElementName, IconWrapper, Link } from "./index.style";

interface ElementsProps {
  currentPageId: number;
}

const Elements: FC<ElementsProps> = ({ currentPageId }) => {
  useFetchPage(currentPageId);

  const page = usePageStore((state) => state.page);
  const updateElementName = usePageStore((state) => state.updateElementName);
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const setActiveElementPath = usePageStore(
    (state) => state.setActiveElementPath,
  );

  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  function handleClick(path: string) {
    return () => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }

      clickTimeout.current = setTimeout(() => {
        setActiveElementPath(path);
      }, 300);
    };
  }

  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  function showNameInput(id: string) {
    return () => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }

      setEditingPageId(id);
    };
  }

  function hideNameInput() {
    setEditingPageId(null);
  }

  function renderElement(element: IElement, parentPath: string, level: number) {
    const path = `${parentPath}/${element.id}`;
    const active = path === activeElementPath;
    const isEditingName = editingPageId === element.id;

    if ("children" in element) {
      return (
        <div key={element.id}>
          <Link
            $active={active}
            $level={level}
            onClick={isEditingName ? undefined : handleClick(path)}
            onDoubleClick={showNameInput(element.id)}
          >
            <IconWrapper>
              {element.type === ElementType.Frame && <FrameIcon />}
            </IconWrapper>
            {isEditingName ? (
              <NameInput<string>
                key={element.id}
                id={element.id}
                value={element.name}
                onBlur={hideNameInput}
                updater={updateElementName}
              />
            ) : (
              <ElementName>{element.name}</ElementName>
            )}
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
        onClick={isEditingName ? undefined : handleClick(path)}
        onDoubleClick={showNameInput(element.id)}
      >
        <IconWrapper>
          {element.type === ElementType.Text && <TextIcon />}
          {element.type === ElementType.Rectangle && <RectangleIcon />}
        </IconWrapper>
        {isEditingName ? (
          <NameInput<string>
            key={element.id}
            id={element.id}
            value={element.name}
            onBlur={hideNameInput}
            updater={updateElementName}
          />
        ) : (
          <ElementName>{element.name}</ElementName>
        )}
      </Link>
    );
  }

  return (
    <div>
      {page.toReversed().map((element) => renderElement(element, "", 1))}
    </div>
  );
};

export default Elements;
