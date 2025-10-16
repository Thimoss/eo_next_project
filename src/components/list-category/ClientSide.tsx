"use client";
import React from "react";
// import Search from "./Search";
import { useCategories } from "../../../hooks/Categories";
import Loading from "../global/Loading";
import Table from "./Table";
// import Pagination from "../global/Pagination";
import EmptyData from "../global/EmptyData";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { FaPlus } from "react-icons/fa";
import Search from "./Search";

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
      <div className="flex flex-col gap-6">
        <h1 className="text-xl text-gray-700 font-bold">Daftar Kategori</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
          <Search />

          <div className="flex justify-end w-full">
            <button
              onClick={() => setOpenCreate(true)}
              className="px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2 shadow-sm"
            >
              <div className="w-4 h-4">
                <FaPlus className="w-full h-full" />
              </div>
              <span className="text-sm font-semibold">Tambah</span>
            </button>
          </div>
        </div>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : data.list.length > 0 ? (
          <div className="flex flex-col gap-6">
            <Table
              categories={data.list}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            {/* <Pagination /> */}
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
