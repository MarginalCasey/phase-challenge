import type { FC } from "react";
import { useEffect, useState } from "react";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const InputNumber: FC<InputNumberProps> = ({ value, onChange, disabled }) => {
  const [state, setState] = useState<string>(value.toString());

  useEffect(() => {
    setState(value.toString());
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);

    const value = Number(event.target.value);

    if (isNaN(value)) return;
    onChange(value);
  }

  function handleBlur() {
    const currentState = Number(state);

    if (isNaN(currentState)) {
      setState(value.toString());
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
