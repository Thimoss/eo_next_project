"use client";
import Master from "@/components/global/Master";
import Pagination from "@/components/global/Pagination";
import CreateModal from "@/components/list-category/CreateModal";
import DeleteModal from "@/components/list-category/DeleteModal";
import Search from "@/components/list-category/Search";
import Table from "@/components/list-category/Table";
import UpdateModal from "@/components/list-category/UpdateModal";
import React from "react";
import { IoAdd } from "react-icons/io5";

import Loading from "@/components/global/Loading";
import EmptyData from "@/components/global/EmptyData";
import { useCategories } from "../../../hooks/Categories";

export default function ListCategory() {
  const {
    openCreate,
    setOpenCreate,
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    selectedCategory,
    // setSelectedCategory,
    // page,
    // setPage,
    // pageSize,
    // setPageSize,
    // searchQuery,
    // setSearchQuery,
    handleEdit,
    handleDelete,
    data,
    // error,
    isLoading,
    // mutate,
  } = useCategories();

  return (
    <Master>
      <div className="flex flex-col gap-5">
        <h1 className="text-black font-bold">List Category</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
          <Search />

          <div className="flex justify-end w-full">
            <button
              onClick={() => setOpenCreate(true)}
              className="flex items-center gap-2 text-white bg-black hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
            >
              <div className="w-4 h-4">
                <IoAdd className="w-full h-full" />
              </div>
              <span className="text-xs font-semibold">Add</span>
            </button>
          </div>
        </div>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : data ? (
          <div className="flex flex-col gap-5">
            {/* Table */}
            <Table
              categories={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            {/* Pagination */}
            <Pagination />
          </div>
        ) : (
          <div>
            <EmptyData />
          </div>
        )}
      </div>
      <CreateModal open={openCreate} setOpen={setOpenCreate} />
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        selectedCategory={selectedCategory}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        selectedCategory={selectedCategory}
      />
    </Master>
  );
}
