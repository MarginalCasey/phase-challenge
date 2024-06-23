import { DEFAULT_FILL, DEFAULT_STROKE } from "@/constants";
import usePageStore from "@/hooks/usePageStore";
import type { IBLockElement } from "@/types";
import { StrokeAlignment } from "@/types";
import type { ChangeEvent, FC } from "react";
import ColorPicker from "./components/ColorPicker";
import InputNumber from "./components/InputNumber";
import { FormItem, Label, Section, Title, Unit } from "./index.style";

interface BlockPropertiesProps {
  element: IBLockElement;
}

const BlockProperties: FC<BlockPropertiesProps> = ({ element }) => {
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const setElement = usePageStore((state) => state.setElement);

  function handleFillColorChange(color: string) {
    if (activeElementPath) {
      setElement(activeElementPath, { fill: { color } });
    }
  }

  function handleFillOpacityChange(value: number) {
    if (activeElementPath) {
      setElement(activeElementPath, { fill: { alpha: value / 100 } });
    }
  }

  function handleStrokeColorChange(color: string) {
    if (activeElementPath) {
      setElement(activeElementPath, { stroke: { color } });
    }
  }

  function handleStrokeOpacityChange(value: number) {
    if (activeElementPath) {
      setElement(activeElementPath, { stroke: { alpha: value / 100 } });
    }
  }

  function handleStrokeWidthChange(value: number) {
    if (activeElementPath) {
      setElement(activeElementPath, { stroke: { width: value } });
    }
  }

  function handleStrokeAlignmentChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    if (activeElementPath) {
      setElement(activeElementPath, { stroke: { alignment: Number(value) } });
    }
  }

  return (
    <>
      <Section>
        <Title>Fill</Title>
        <FormItem>
          <ColorPicker
            value={element.fill?.color}
            onChange={handleFillColorChange}
          />
        </FormItem>
        <FormItem>
          <InputNumber
            value={(element.fill?.alpha ?? DEFAULT_FILL.alpha) * 100}
            onChange={handleFillOpacityChange}
            min={0}
            max={100}
          />
          <Unit>%</Unit>
        </FormItem>
      </Section>
      <Section>
        <Title>Stroke</Title>
        <FormItem>
          <ColorPicker
            value={element.stroke?.color}
            onChange={handleStrokeColorChange}
          />
        </FormItem>
        <FormItem>
          <InputNumber
            value={(element.stroke?.alpha ?? DEFAULT_STROKE.alpha) * 100}
            onChange={handleStrokeOpacityChange}
            min={0}
            max={100}
          />
          <Unit>%</Unit>
        </FormItem>
        <FormItem>
          <select onChange={handleStrokeAlignmentChange}>
            <option value={StrokeAlignment.Inner}>Inner</option>
            <option value={StrokeAlignment.Center}>Center</option>
            <option value={StrokeAlignment.Outer}>Outer</option>
          </select>
        </FormItem>
        <FormItem>
          <Label>W</Label>
          <InputNumber
            value={element.stroke?.width ?? DEFAULT_STROKE.width}
            onChange={handleStrokeWidthChange}
            min={1}
          />
        </FormItem>
      </Section>
    </>
  );
};

export default BlockProperties;
