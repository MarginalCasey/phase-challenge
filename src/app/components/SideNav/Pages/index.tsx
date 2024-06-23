import usePagesStore from "@/hooks/usePagesStore";
import type { FC } from "react";
import { useRef, useState } from "react";
import NameInput from "../components/NameInput";
import useFetchPages from "./hooks/useFetchPages";
import { Link, PagesWrapper, Title } from "./index.style";

interface PagesProps {
  currentPageId: number;
}

const Pages: FC<PagesProps> = ({ currentPageId }) => {
  useFetchPages();
  const pages = usePagesStore((state) => state.pages);
  const updatePageName = usePagesStore((state) => state.updatePageName);

  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  function redirect(id: number) {
    return () => {
      if (id === currentPageId) {
        return;
      }

      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }

      clickTimeout.current = setTimeout(() => {
        window.location.href = `/${id}`;
      }, 300);
    };
  }

  const [editingPageId, setEditingPageId] = useState<number | null>(null);

  function showNameInput(id: number) {
    return () => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }

      setEditingPageId(id);
    };
  }

  function hideNameInput() {
    setEditingPageId(null);
  }

  return (
    <PagesWrapper>
      <Title>Pages</Title>
      {pages.map((page) =>
        editingPageId === page.id ? (
          <NameInput<number>
            key={page.id}
            id={page.id}
            value={page.name}
            onBlur={hideNameInput}
            updater={updatePageName}
          />
        ) : (
          <Link
            key={page.id}
            $active={currentPageId === page.id}
            onClick={redirect(page.id)}
            onDoubleClick={showNameInput(page.id)}
          >
            {page.name}
          </Link>
        ),
      )}
    </PagesWrapper>
  );
};

export default Pages;
