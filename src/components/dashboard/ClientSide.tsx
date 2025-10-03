"use client";
import React from "react";
import Search from "./Search";
import SortBy from "./SortBy";
import DocumentCard from "./DocumentCard";
import { useDashboard } from "../../../hooks/Dashboard";
import Loading from "../global/Loading";
import EmptyData from "../global/EmptyData";
import { Document } from "../../../types/Documents.type";
import { IoAdd } from "react-icons/io5";
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
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Search />
            <button
              onClick={() => setOpenCreate(true)}
              className="flex items-center gap-2 text-white bg-primaryGreen hover:bg-primaryGreenDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
            >
              <div className="w-4 h-4">
                <IoAdd className="w-full h-full" />
              </div>
              <span className="text-xs font-semibold">Tambah</span>
            </button>
          </div>
          <SortBy
            sortBy={sortBy}
            isSortByOpen={isSortByOpen}
            handleSelect={handleSelect}
            toggleDropdown={toggleDropdown}
            dropdownRef={dropdownRef}
          />
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
