import usePageStore from "@/hooks/usePageStore";
import type { IElement } from "@/types";
import { ElementType } from "@/types";
import type { FC } from "react";
import FrameIcon from "../../../../icons/FrameIcon";
import RectangleIcon from "../../../../icons/RectangleIcon";
import TextIcon from "../../../../icons/TextIcon";
import NameInput from "../components/NameInput";
import useDeleteActiveElement from "./hooks/useDeleteActiveElement";
import useUpdateName from "./hooks/useEditableName";
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

  const { clickTimeoutRef, editingPageId, showNameInput, hideNameInput } =
    useUpdateName();

  useDeleteActiveElement();

  function handleClick(path: string) {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }

      clickTimeoutRef.current = setTimeout(() => {
        setActiveElementPath(path);
      }, 300);
    };
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
              <NameInput
                key={element.id}
                path={path}
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
          <NameInput
            key={element.id}
            path={path}
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
