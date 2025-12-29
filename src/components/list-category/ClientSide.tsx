"use client";
import React from "react";
import { useCategories } from "../../../hooks/Categories";
import Loading from "../global/Loading";
import Table from "./Table";
import EmptyData from "../global/EmptyData";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { FaPlus } from "react-icons/fa";
import SearchBar from "../global/SearchBar";

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
  const list = data?.list ?? [];
  const totalLabel = isLoading ? "Memuat..." : `${list.length} Kategori`;
  const hasData = list.length > 0;

  return (
    <>
      <div className="flex flex-col gap-8">
        <section className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-8">
          <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-primaryBlue/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-0 h-44 w-44 rounded-full bg-primaryGreen/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primaryBlue">
                Kategori
              </p>
              <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                Daftar Kategori
              </h1>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Kelola kategori untuk struktur data yang lebih rapi.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primaryGreen" />
                {totalLabel}
              </div>
              <button
                onClick={() => setOpenCreate(true)}
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primaryGreen px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] transition duration-200 hover:bg-primaryGreenDarker sm:w-auto"
              >
                <FaPlus className="h-4 w-4" />
                Tambah Kategori
              </button>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <SearchBar
              placeholder="Cari kategori..."
              showAction={false}
              containerClassName="sm:max-w-lg"
            />
          </div>

          {isLoading ? (
            <Loading />
          ) : hasData ? (
            <div className="flex flex-col gap-6">
              <Table
                categories={list}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          ) : (
            <EmptyData />
          )}
        </div>
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
