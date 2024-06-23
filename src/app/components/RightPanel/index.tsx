import usePageStore from "../../hooks/usePageStore";
import InputNumber from "./components/InputNumber";
import useActiveElement from "./hooks/useActiveElement";
import { Label, RightPanelWrapper, Section, Title } from "./index.style";

const RightPanel = () => {
  const element = useActiveElement();
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const renderedElement = usePageStore((state) => state.activeElement);
  const setElement = usePageStore((state) => state.setElement);

  const strokeWidth = (() => {
    if (!element) return 0;
    if ("stroke" in element) {
      return element.stroke?.width ?? 1;
    }
    return 0;
  })();
  const width = (() => {
    if (!renderedElement) return 0;
    return renderedElement?.width - strokeWidth;
  })();
  const height = (() => {
    if (!renderedElement) return 0;
    return renderedElement?.height - strokeWidth;
  })();

  function handleInputChange(property: string) {
    return (value: number) => {
      if (activeElementPath) {
        setElement(activeElementPath, { [property]: value });
      }
    };
  }

  function handleOpacityChange(value: number) {
    if (activeElementPath) {
      setElement(activeElementPath, { alpha: value / 100 });
    }
  }

  return (
    <RightPanelWrapper>
      {element && renderedElement && (
        <>
          <Section>
            <Label>
              <span>X</span>
              <InputNumber
                value={element.x}
                onChange={handleInputChange("x")}
              />
            </Label>
            <Label>
              <span>Y</span>
              <InputNumber
                value={element.y}
                onChange={handleInputChange("y")}
              />
            </Label>
            <Label>
              <span>W</span>
              <InputNumber
                value={"width" in element ? element.width : width}
                onChange={handleInputChange("width")}
                disabled={!("width" in element)}
              />
            </Label>
            <Label>
              <span>H</span>
              <InputNumber
                value={"height" in element ? element.height : height}
                onChange={handleInputChange("height")}
                disabled={!("height" in element)}
              />
            </Label>
          </Section>
          <Section>
            <Title>Opacity</Title>
            <div>
              <Label>
                <InputNumber
                  value={element.alpha * 100}
                  onChange={handleOpacityChange}
                  min={0}
                  max={100}
                />
                <span>%</span>
              </Label>
            </div>
          </Section>
        </>
      )}
    </RightPanelWrapper>
  );
};

export default RightPanel;
