"use client";
import React from "react";
import ItemTable from "./ItemTable";
import { useDetailCategories } from "../../../hooks/DetailCategories";
import { IoPencil, IoTrash } from "react-icons/io5";
import CreateModalSector from "./CreateModalSector";
import DeleteModalSector from "./DeleteModalSector";
import Loading from "../global/Loading";
import { Sector } from "../../../types/Sectors.type";
import DeleteModalItem from "./DeleteModalItem";
import UpdateModalSector from "./UpdateModalSector";
import UpdateModalItem from "./UpdateModalItem";
import SectorEmpty from "./SectorEmpty";
import CreateModalItem from "./CreateModalItem";
import { FaPlus } from "react-icons/fa";

interface ClientSideDetailCategoryProps {
  id: string;
}

export default function ClientSide({ id }: ClientSideDetailCategoryProps) {
  const {
    openCreateSector,
    setOpenCreateSector,
    openUpdateSector,
    setOpenUpdateSector,
    openDeleteSector,
    setOpenDeleteSector,
    openCreateItem,
    setOpenCreateItem,
    openUpdateItem,
    setOpenUpdateItem,
    openDeleteItem,
    setOpenDeleteItem,
    selectedSector,
    // setSelectedSector,
    selectedItem,
    handleCreateItem,
    // setSelectedItem,
    handleEditSector,
    handleDeleteSector,
    handleEditItem,
    handleDeleteItem,
    dataDetail,
    mutateDetail,
    isLoadingDetail,
    // errorDetail,
  } = useDetailCategories({ id });

  return (
    <>
      {isLoadingDetail ? (
        <Loading />
      ) : dataDetail ? (
        <div className="flex flex-col gap-8">
          <section className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-8">
            <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-primaryBlue/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-0 h-44 w-44 rounded-full bg-primaryGreen/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primaryBlue">
                  Detail Kategori
                </p>
                <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                  {dataDetail.name}
                </h1>
                <p className="mt-2 text-sm text-gray-500 sm:text-base">
                  INFRASTRUCTURE MANAGEMENT & PROJECT - DIREKTORAT REKAYASA &
                  INFRASTRUKTUR DARAT
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Referensi
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-800">
                      {dataDetail.reference}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Lokasi
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-800">
                      {dataDetail.location}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Kode
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-800">
                      {dataDetail.code}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-primaryGreen" />
                  {dataDetail.sectors.length} Sektor
                </div>
                <button
                  type="button"
                  onClick={() => setOpenCreateSector(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primaryGreen px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] transition duration-200 hover:bg-primaryGreenDarker sm:w-auto"
                >
                  <FaPlus className="h-4 w-4" />
                  Tambah Sektor
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-8">
            {dataDetail.sectors.length === 0 ? (
              <SectorEmpty />
            ) : (
              dataDetail.sectors.map((sector: Sector) => (
                <div
                  key={sector.id}
                  className="rounded-2xl border border-gray-200/70 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Sektor
                      </p>
                      <p className="mt-1 text-base font-semibold text-gray-800">
                        {sector.categoryCode}.{sector.no} {sector.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Sumber: {sector.source ? sector.source : "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditSector(sector)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primaryGreen text-white shadow-sm transition duration-200 hover:bg-primaryGreenDarker"
                      >
                        <IoPencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSector(sector)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primaryRed text-white shadow-sm transition duration-200 hover:bg-primaryRedDarker"
                      >
                        <IoTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ItemTable
                      data={sector.items}
                      openCreate={openCreateItem}
                      handleCreate={handleCreateItem}
                      selectedSector={sector}
                      handleEdit={handleEditItem}
                      handleDelete={handleDeleteItem}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200/70 bg-white p-6 text-center text-sm font-semibold text-gray-600 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
          Data tidak ditemukan.
        </div>
      )}
      <CreateModalSector
        open={openCreateSector}
        setOpen={setOpenCreateSector}
        mutate={mutateDetail}
        categoryId={id}
      />
      <UpdateModalSector
        open={openUpdateSector}
        setOpen={setOpenUpdateSector}
        mutate={mutateDetail}
        categoryId={id}
        selectedSector={selectedSector}
      />
      <CreateModalItem
        open={openCreateItem}
        setOpen={setOpenCreateItem}
        mutate={mutateDetail}
        selectedSector={selectedSector}
      />
      <UpdateModalItem
        open={openUpdateItem}
        setOpen={setOpenUpdateItem}
        mutate={mutateDetail}
        selectedSector={selectedSector}
        selectedItem={selectedItem}
      />

      <DeleteModalSector
        open={openDeleteSector}
        setOpen={setOpenDeleteSector}
        mutate={mutateDetail}
        selectedSector={selectedSector}
      />
      <DeleteModalItem
        open={openDeleteItem}
        setOpen={setOpenDeleteItem}
        mutate={mutateDetail}
        selectedItem={selectedItem}
      />
    </>
  );
}
