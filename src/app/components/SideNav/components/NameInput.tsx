import type { ChangeEvent } from "react";
import { useState } from "react";
import { Input } from "../Pages/index.style";

interface NameInputProps<T> {
  id: T;
  value: string;
  onBlur: () => void;
  updater: (id: T, name: string) => void;
}

const NameInput = <T,>({ id, value, onBlur, updater }: NameInputProps<T>) => {
  const [nameState, setNameState] = useState(value);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNameState(e.target.value);
  }

  function handleBlur() {
    if (nameState.length > 0) {
      updater(id, nameState);
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
