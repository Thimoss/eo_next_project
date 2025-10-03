import { useEffect, useRef, useState } from "react";
import Api from "../service/Api";
import useSWR from "swr";
import { useRouter } from "nextjs-toploader/app";
import { Document } from "../types/Documents.type";

export interface SortByDataProps {
  value: string;
  label: string;
}

export const sortByList = [
  {
    value: "asc",
    label: "Abjad (A-Z)",
  },
  {
    value: "desc",
    label: "Abjad (Z-A)",
  },
  {
    value: "recent",
    label: "Terbaru",
  },
  {
    value: "least",
    label: "Paling Lama Diperbarui",
  },
];

export const useDashboard = () => {
  const route = useRouter();
  const [sortBy, setSortBy] = useState<SortByDataProps>(sortByList[0]);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fetcher = async (url: string, sortBy: string) => {
    const api = new Api();
    api.url = url;
    api.method = "GET";
    api.body = {
      sortBy,
    };

    const response = await api.call();
    if (!response.statusCode.toString().startsWith("2")) {
      throw new Error(response.meta.message);
    }
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    [`document/list`, sortBy],
    ([url, sortBy]) => fetcher(url, sortBy.value), // The fetcher function
    {
      revalidateOnFocus: false,
      // refreshInterval: 0,
    }
  );

  const toggleDropdown = () => {
    setIsSortByOpen(!isSortByOpen);
  };

  const handleEdit = async (document: Document) => {
    setSelectedDocument(document);
    setOpenEdit(true);
  };
  const handleDelete = async (document: Document) => {
    setSelectedDocument(document);
    setOpenDelete(true);
  };

  const handleSelect = (sortBy: SortByDataProps) => {
    setSortBy(sortBy);
    setIsSortByOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortByOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDetail = async (document: any) => {
    route.push(`detail-documents/${document.slug}`);
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    sortBy,
    setSortBy,
    isSortByOpen,
    setIsSortByOpen,
    handleSelect,
    toggleDropdown,
    dropdownRef,
    openCreate,
    setOpenCreate,
    handleDetail,
    selectedDocument,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete,
    handleEdit,
    handleDelete,
  };
};
