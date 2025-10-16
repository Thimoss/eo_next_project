"use client";
import React from "react";
// import Search from "./Search";
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
import Search from "./Search";

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
      <div>
        {isLoadingDetail ? (
          <div>
            <Loading />
          </div>
        ) : dataDetail ? (
          <div className="flex flex-col gap-6">
            <div className="text-base text-gray-700 font-bold flex flex-col gap-1">
              <p>{dataDetail?.reference}</p>
              <p>
                INFRASTRUCTURE MANAGEMENT & PROJECT - DIREKTORAT REKAYASA &
                INFRASTRUKTUR DARAT
              </p>
              <p>Kategori: {dataDetail?.name}</p>
              <p>Lokasi: {dataDetail?.location}</p>
              <p>Kode: {dataDetail?.code}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <Search />

              <div className="flex justify-end w-full">
                <button
                  onClick={() => setOpenCreateSector(true)}
                  className="px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2 shadow-sm"
                >
                  <div className="w-4 h-4">
                    <FaPlus className="w-full h-full" />
                  </div>
                  <span className="text-sm font-semibold">Tambah</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              {dataDetail.sectors.length === 0 ? (
                <SectorEmpty />
              ) : (
                dataDetail.sectors.map((sector: Sector) => (
                  <div key={sector.id} className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-base text-gray-700 font-semibold">
                            {sector.categoryCode}.{sector.no} {sector.name}
                          </p>
                          <button
                            onClick={() => handleEditSector(sector)}
                            className=" hover:bg-primaryGreen hover:shadow-sm hover:text-white rounded-md cursor-pointer py-2 px-4 transition duration-300 ease-in-out text-primaryGreen"
                          >
                            <IoPencil className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteSector(sector)}
                          className="px-4 hover:bg-primaryRed hover:shadow-sm hover:text-white text-primaryRed rounded-md cursor-pointer py-2 transition duration-300 ease-in-out"
                        >
                          <IoTrash className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Sumber: {sector.source ? sector.source : "-"}
                      </span>
                    </div>
                    <ItemTable
                      data={sector.items}
                      openCreate={openCreateItem}
                      handleCreate={handleCreateItem}
                      selectedSector={sector}
                      handleEdit={handleEditItem}
                      handleDelete={handleDeleteItem}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div>Error</div>
        )}
      </div>
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
