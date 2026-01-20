import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useRouter } from "nextjs-toploader/app";
import Api from "../service/Api";
import { Document } from "../types/Documents.type";
import { sortByList, type SortByDataProps } from "./Dashboard";

interface UseDocumentListProps {
  accessToken?: string;
  scope: "created" | "review" | "confirm";
}

export const useDocumentList = ({
  accessToken,
  scope,
}: UseDocumentListProps) => {
  const route = useRouter();
  const [sortBy, setSortBy] = useState<SortByDataProps>(sortByList[0]);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetcher = async (url: string, scope: string, sortBy: string) => {
    const api = new Api();
    api.url = url;
    api.auth = true;
    api.token = accessToken ?? "";
    api.method = "GET";
    api.body = {
      scope,
      sortBy,
    };

    const response = await api.call();
    const statusCode = response?.statusCode ?? response?.meta?.code;
    if (!statusCode || !statusCode.toString().startsWith("2")) {
      const message =
        response?.message ||
        response?.meta?.message ||
        "Gagal memuat data dokumen.";
      throw new Error(message);
    }
    return response.data ?? [];
  };

  const { data, error, isLoading, mutate } = useSWR(
    ["document/list", scope, sortBy],
    ([url, scope, sortBy]) => fetcher(url, scope, sortBy.value),
    {
      revalidateOnFocus: false,
    }
  );

  const toggleDropdown = () => {
    setIsSortByOpen(!isSortByOpen);
  };

  const handleSelect = (nextSortBy: SortByDataProps) => {
    setSortBy(nextSortBy);
    setIsSortByOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortByOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDetail = async (document: Document) => {
    route.push(`/detail-documents/${document.slug}`);
  };

  return {
    data: (data ?? []) as Document[],
    error,
    isLoading,
    mutate,
    sortBy,
    isSortByOpen,
    handleSelect,
    toggleDropdown,
    dropdownRef,
    handleDetail,
  };
};
