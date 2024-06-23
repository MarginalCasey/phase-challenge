import usePageStore from "../../hooks/usePageStore";
import InputNumber from "./components/InputNumber";
import useActiveElement from "./hooks/useActiveElement";
import {
  FormItem,
  Label,
  RightPanelWrapper,
  Section,
  Title,
  Unit,
} from "./index.style";

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
            <FormItem>
              <Label>X</Label>
              <InputNumber
                value={element.x}
                onChange={handleInputChange("x")}
              />
            </FormItem>
            <FormItem>
              <Label>Y</Label>
              <InputNumber
                value={element.y}
                onChange={handleInputChange("y")}
              />
            </FormItem>
            <FormItem>
              <Label>W</Label>
              <InputNumber
                value={"width" in element ? element.width : width}
                onChange={handleInputChange("width")}
                disabled={!("width" in element)}
              />
            </FormItem>
            <FormItem>
              <Label>H</Label>
              <InputNumber
                value={"height" in element ? element.height : height}
                onChange={handleInputChange("height")}
                disabled={!("height" in element)}
              />
            </FormItem>
          </Section>
          <Section>
            <Title>Opacity</Title>
            <div>
              <FormItem>
                <InputNumber
                  value={element.alpha * 100}
                  onChange={handleOpacityChange}
                  min={0}
                  max={100}
                />
                <Unit>%</Unit>
              </FormItem>
            </div>
          </Section>
        </>
      )}
    </RightPanelWrapper>
  );
};

export default RightPanel;
