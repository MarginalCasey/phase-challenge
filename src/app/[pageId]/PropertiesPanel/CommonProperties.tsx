import usePageStore from "@/hooks/usePageStore";
import type { IElement } from "@/types";
import type { FC } from "react";
import InputNumber from "./components/InputNumber";
import { FormItem, Label, Section, Title, Unit } from "./index.style";

interface CommonPropertiesProps {
  element: IElement;
}

const CommonProperties: FC<CommonPropertiesProps> = ({ element }) => {
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

  function handleNumberInputChange(property: string) {
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
    <>
      <Section>
        <FormItem>
          <Label>X</Label>
          <InputNumber
            value={element.x}
            onChange={handleNumberInputChange("x")}
          />
        </FormItem>
        <FormItem>
          <Label>Y</Label>
          <InputNumber
            value={element.y}
            onChange={handleNumberInputChange("y")}
          />
        </FormItem>
        <FormItem>
          <Label>W</Label>
          <InputNumber
            value={"width" in element ? element.width : width}
            onChange={handleNumberInputChange("width")}
            disabled={!("width" in element)}
          />
        </FormItem>
        <FormItem>
          <Label>H</Label>
          <InputNumber
            value={"height" in element ? element.height : height}
            onChange={handleNumberInputChange("height")}
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
  );
};

export default CommonProperties;
