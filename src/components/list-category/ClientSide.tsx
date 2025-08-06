"use client";
import React from "react";
import Search from "./Search";
import { useCategories } from "../../../hooks/Categories";
import { IoAdd } from "react-icons/io5";
import Loading from "../global/Loading";
import Table from "./Table";
import Pagination from "../global/Pagination";
import EmptyData from "../global/EmptyData";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

export default function ClientSide() {
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
    mutate,
  } = useCategories();

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-black font-bold">List Category</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
          <Search />

          <div className="flex justify-end w-full">
            <button
              onClick={() => setOpenCreate(true)}
              className="flex items-center gap-2 text-white bg-primaryGreen hover:bg-primaryGreenDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
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
        ) : data.list.length > 0 ? (
          <div className="flex flex-col gap-5">
            <Table
              categories={data.list}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            <Pagination />
          </div>
        ) : (
          <div>
            <EmptyData />
          </div>
        )}
      </div>
      <CreateModal open={openCreate} setOpen={setOpenCreate} mutate={mutate} />
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        selectedCategory={selectedCategory}
        mutate={mutate}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        selectedCategory={selectedCategory}
        mutate={mutate}
      />
    </>
  );
}
