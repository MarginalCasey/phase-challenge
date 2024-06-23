import type { ChangeEvent, FC } from "react";
import { DEFAULT_COLOR } from "../../../../constants";
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
  value = DEFAULT_COLOR,
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
