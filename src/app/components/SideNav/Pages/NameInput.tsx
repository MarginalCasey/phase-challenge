import type { IPageListItem } from "@/hooks/usePagesStore";
import usePagesStore from "@/hooks/usePagesStore";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import { Input } from "./index.style";

interface NameInputProps {
  id: number;
  onBlur: () => void;
}

const NameInput: FC<NameInputProps> = ({ id, onBlur }) => {
  const pages = usePagesStore((state) => state.pages);
  const page = pages.find((page) => page.id === id) as IPageListItem;
  const { name } = page;

  const updatePageName = usePagesStore((state) => state.updatePageName);

  const [nameState, setNameState] = useState(name);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNameState(e.target.value);
  }

  function handleBlur() {
    if (nameState.length > 0) {
      updatePageName(id, nameState);
    } else {
      setNameState(name);
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
