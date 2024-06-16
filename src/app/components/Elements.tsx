import useStageStore from "../hooks/usePageStore";
import type { IElement } from "../types";

const Elements = () => {
  const page = useStageStore((state) => state.page);

  const renderElement = (element: IElement) => {
    if ("children" in element) {
      return (
        <div key={element.id}>
          <div>{element.name}</div>
          <div>
            {element.children.toReversed().map((child) => renderElement(child))}
          </div>
        </div>
      );
    }

    return <div key={element.id}>{element.name}</div>;
  };

  return (
    <div>{page.toReversed().map((element) => renderElement(element))}</div>
  );
};

export default Elements;
