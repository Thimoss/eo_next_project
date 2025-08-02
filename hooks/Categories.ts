import { useState } from "react";
import { Category } from "../types/Categories.type";
import useSWR from "swr";
import Api from "../service/Api";

export const useCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = async (category: Category) => {
    setSelectedCategory(category);
    setOpenUpdate(true);
  };
  const handleDelete = async (category: Category) => {
    setSelectedCategory(category);
    setOpenDelete(true);
  };

  const fetcher = async (
    url: string,
    page: number,
    pageSize: number,
    name?: string
  ) => {
    const api = new Api();
    api.url = url;
    api.method = "GET";
    api.body = {
      page,
      pageSize,
      name,
    };

    const response = await api.call();
    console.log("red");
    if (!response.statusCode.toString().startsWith("2")) {
      throw new Error(response.meta.message);
    }
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    [`category/list`, page, pageSize, searchQuery],
    ([url, page, pageSize, name]) => fetcher(url, page, pageSize, name), // The fetcher function
    {
      revalidateOnFocus: false,
      // refreshInterval: 0,
    }
  );

  return {
    openCreate,
    setOpenCreate,
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
    pageSize,
    setPageSize,
    searchQuery,
    setSearchQuery,
    handleEdit,
    handleDelete,
    data,
    error,
    isLoading,
    mutate,
  };
};
