"use client";
import React from "react";
import SortBy from "./SortBy";
import DocumentCard from "./DocumentCard";
import { useDashboard } from "../../../hooks/Dashboard";
import Loading from "../global/Loading";
import EmptyData from "../global/EmptyData";
import { Document } from "../../../types/Documents.type";
import { FaPlus } from "react-icons/fa";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

export default function ClientSide() {
  const {
    data,
    isLoading,
    mutate,
    sortBy,
    isSortByOpen,
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
  } = useDashboard();

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* <Search /> */}
            <button
              onClick={() => setOpenCreate(true)}
              className="px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center hidden md:flex gap-2 shadow-sm"
            >
              <div className="w-4 h-4">
                <FaPlus className="w-full h-full" />
              </div>
              <span className="text-sm font-semibold">Tambah</span>
            </button>
          </div>
          <div className="flex items-center justify-between ">
            <SortBy
              sortBy={sortBy}
              isSortByOpen={isSortByOpen}
              handleSelect={handleSelect}
              toggleDropdown={toggleDropdown}
              dropdownRef={dropdownRef}
            />
            <button
              onClick={() => setOpenCreate(true)}
              className="px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex md:hidden gap-2"
            >
              <div className="w-4 h-4">
                <FaPlus className="w-full h-full" />
              </div>
              <span className="text-sm font-semibold">Tambah</span>
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : data.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
            {data.map((document: Document) => (
              <DocumentCard
                document={document}
                key={document.id}
                handleDetail={handleDetail}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyData />
        )}
      </div>
      <CreateModal open={openCreate} setOpen={setOpenCreate} mutate={mutate} />
      <UpdateModal
        open={openEdit}
        setOpen={setOpenEdit}
        mutate={mutate}
        selectedDocument={selectedDocument}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        mutate={mutate}
        selectedDocument={selectedDocument}
      />
    </>
  );
}
