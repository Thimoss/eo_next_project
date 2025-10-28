/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = async (user: any) => {
    setSelectedUser(user);
    setOpenUpdate(true);
  };
  const handleDelete = async (user: any) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };
  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    pageSize,
    setPageSize,
    selectedUser,
    setSelectedUser,
    openCreate,
    setOpenCreate,
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    handleEdit,
    handleDelete,
  };
};
