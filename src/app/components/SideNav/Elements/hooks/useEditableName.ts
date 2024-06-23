import { useRef, useState } from "react";

const useEditableName = () => {
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  function showNameInput(id: string) {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }

      setEditingPageId(id);
    };
  }

  function hideNameInput() {
    setEditingPageId(null);
  }

  return {
    clickTimeoutRef,
    editingPageId,
    showNameInput,
    hideNameInput,
  };
};

export default useEditableName;
