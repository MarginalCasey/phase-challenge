import type { FC } from "react";
import { useEffect, useState } from "react";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
}

const InputNumber: FC<InputNumberProps> = ({
  value,
  onChange,
  disabled,
  min,
  max,
}) => {
  const [state, setState] = useState<string>(value.toString());

  useEffect(() => {
    setState(value.toString());
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);

    const value = Number(event.target.value);

    if (isNaN(value)) return;
    if (min !== undefined && value < min) return;
    if (max !== undefined && value > max) return;

    onChange(value);
  }

  function handleBlur() {
    const currentState = Number(state);

    if (isNaN(currentState)) {
      setState(value.toString());
    }
    if (min !== undefined && currentState < min) {
      setState(min.toString());
      onChange(min);
    }
    if (max !== undefined && currentState > max) {
      setState(max.toString());
      onChange(max);
    }
  }

  return (
    <input
      value={state}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
    />
  );
};

export default InputNumber;
