import type { ChangeEvent } from "react";
import { useState } from "react";
import { Input } from "../Pages/index.style";

interface NameInputProps {
  path: string;
  value: string;
  onBlur: () => void;
  updater: (path: string, name: string) => void;
}

const NameInput = ({ path, value, onBlur, updater }: NameInputProps) => {
  const [nameState, setNameState] = useState(value);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNameState(e.target.value);
  }

  function handleBlur() {
    if (nameState.length > 0) {
      updater(path, nameState);
    } else {
      setNameState(value);
    }
    onBlur();
  }

  return (
    <Input
      value={nameState}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
    />
  );
};

export default NameInput;
