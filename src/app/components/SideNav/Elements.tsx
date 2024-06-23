import usePageStore from "@/hooks/usePageStore";
import type { IElement } from "@/types";
import styled from "styled-components";

const Link = styled.div<{ $active: boolean }>`
  color: ${(props) => (props.$active ? "red" : "black")};
  cursor: pointer;
`;

const Elements = () => {
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
