import styled from "styled-components";
import useStageStore from "../hooks/usePageStore";
import type { IElement } from "../types";

const Link = styled.div<{ $active: boolean }>`
  color: ${(props) => (props.$active ? "red" : "white")};
  cursor: pointer;
`;

const Elements = () => {
  const page = useStageStore((state) => state.page);
  const activeElementPath = useStageStore((state) => state.activeElementPath);
  const setActiveElementPath = useStageStore(
    (state) => state.setActiveElementPath,
  );

  function handleClick(path: string) {
    return () => {
      setActiveElementPath(path);
    };
  }

  const renderElement = (element: IElement, parentPath: string) => {
    const path = `${parentPath}/${element.id}`;
    const active = path === activeElementPath;

    if ("children" in element) {
      return (
        <div key={element.id}>
          <Link $active={active} onClick={handleClick(path)}>
            {element.name}
          </Link>
          <div>
            {element.children
              .toReversed()
              .map((child) => renderElement(child, path))}
          </div>
        </div>
      );
    }

    return (
      <Link key={element.id} $active={active} onClick={handleClick(path)}>
        {element.name}
      </Link>
    );
  };

  return (
    <div>{page.toReversed().map((element) => renderElement(element, ""))}</div>
  );
};

export default Elements;
