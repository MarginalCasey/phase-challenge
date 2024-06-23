import usePagesStore from "@/hooks/usePagesStore";
import { useEffect } from "react";

const useFetchPages = () => {
  const fetchPages = usePagesStore((state) => state.fetchPages);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);
};

export default useFetchPages;
