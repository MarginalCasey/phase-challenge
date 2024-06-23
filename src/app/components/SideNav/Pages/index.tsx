import usePagesStore from "@/hooks/usePagesStore";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import NameInput from "./NameInput";
import useFetchPages from "./hooks/useFetchPages";
import { Link, PagesWrapper, Title } from "./index.style";

const Pages = () => {
  useFetchPages();
  const pages = usePagesStore((state) => state.pages);

  const pathname = usePathname();
  const currentPageId = Number(pathname.replace("/", ""));

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
          <NameInput key={page.id} id={page.id} onBlur={hideNameInput} />
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
