import { useState } from "react";
import { UserSession } from "../types/Session.type";
import Api from "../service/Api";
import useSWR from "swr";

interface UseListUsersProps {
  accessToken?: string;
  session?: UserSession;
}

export const useListUsers = ({ accessToken, session }: UseListUsersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [selectedUser, setSelectedUser] = useState<UserSession>();
  const [openCreate, setOpenCreate] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetcher = async (
    url: string,
    page: number,
    pageSize: number,
    name?: string
  ) => {
    const api = new Api();
    api.url = url;
    api.auth = true;
    api.token = accessToken ?? "";
    api.method = "GET";
    api.body = {
      page,
      pageSize,
      name,
    };

    const response = await api.call();
    if (!response.statusCode.toString().startsWith("2")) {
      throw new Error(response.meta.message);
    }
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    [`users/list`, page, pageSize, searchQuery],
    ([url, page, pageSize, name]) => fetcher(url, page, pageSize, name), // The fetcher function
    {
      revalidateOnFocus: false,
      // refreshInterval: 0,
    }
  );

  const handleReset = async (user: UserSession) => {
    setSelectedUser(user);
    setOpenReset(true);
  };
  const handleDelete = async (user: UserSession) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  return {
    openCreate,
    setOpenCreate,
    openReset,
    setOpenReset,
    openDelete,
    setOpenDelete,
    selectedUser,
    setSelectedUser,
    page,
    setPage,
    pageSize,
    setPageSize,
    searchQuery,
    setSearchQuery,
    handleReset,
    handleDelete,
    data,
    error,
    isLoading,
    mutate,
  };
};
