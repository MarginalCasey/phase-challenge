import usePageStore from "@/hooks/usePageStore";
import { useEffect } from "react";

const useFetchPage = (currentPageId: number) => {
  const fetchPage = usePageStore((state) => state.fetchPage);

  useEffect(() => {
    fetchPage(currentPageId);
  }, [currentPageId, fetchPage]);
};

export default useFetchPage;
