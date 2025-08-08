import { useEffect, useRef, useState } from "react";
import Api from "../service/Api";
import useSWR from "swr";

export interface SortByDataProps {
  value: string;
  label: string;
}

export const sortByList = [
  {
    value: "asc",
    label: "Alphabetical (A-Z)",
  },
  {
    value: "desc",
    label: "Alphabetical (Z-A)",
  },
  {
    value: "recent",
    label: "Most Recently Updated",
  },
  {
    value: "least",
    label: "Least Recently Updated",
  },
];

export const useDashboard = () => {
  const [sortBy, setSortBy] = useState<SortByDataProps>(sortByList[0]);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
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
  };
};
