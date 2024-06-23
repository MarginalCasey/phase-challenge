import type { ChangeEvent, FC } from "react";
import { defaultColor } from "../../../../constants";
import {
  ColorCode,
  ColorInput,
  ColorPickerWrapper,
  Container,
} from "./index.style";

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({
  value = defaultColor,
  onChange,
}) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <Container>
      <ColorPickerWrapper $background={value}>
        <ColorInput type="color" value={value} onChange={handleChange} />
      </ColorPickerWrapper>
      <ColorCode>{value}</ColorCode>
    </Container>
  );
};

export default ColorPicker;
