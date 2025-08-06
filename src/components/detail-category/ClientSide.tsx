"use client";
import React from "react";
import Search from "./Search";
import ItemTable from "./ItemTable";
import { useDetailCategories } from "../../../hooks/DetailCategories";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import CreateModalSector from "./CreateModalSector";
import DeleteModalSector from "./DeleteModalSector";
import Loading from "../global/Loading";
import { Sector } from "../../../types/Sectors.type";
import DeleteModalItem from "./DeleteModalItem";
import UpdateModalSector from "./UpdateModalSector";
import UpdateModalItem from "./UpdateModalItem";

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
    // setOpenCreateItem,
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
          <div className="flex flex-col gap-5">
            <div className="text-xs font-bold flex flex-col gap-1">
              <p>{dataDetail?.reference}</p>
              <p>
                INFRASTRUCTURE MANAGEMENT & PROJECT - DIREKTORAT REKAYASA &
                INFRASTRUKTUR DARAT
              </p>
              <p>Category: {dataDetail?.name}</p>
              <p>Location: {dataDetail?.location}</p>
              <p>Kode: {dataDetail?.code}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <Search />

              <div className="flex justify-end w-full">
                <button
                  onClick={() => setOpenCreateSector(true)}
                  className="flex items-center gap-2 text-white bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
                >
                  <div className="w-4 h-4">
                    <IoAdd className="w-full h-full" />
                  </div>
                  <span className="text-xs font-semibold">Add Sector</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              {dataDetail.sectors.length === 0 ? (
                <div>Belum ada Sector</div>
              ) : (
                dataDetail.sectors.map((sector: Sector) => (
                  <div key={sector.id} className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">
                            {sector.categoryCode}.{sector.no} {sector.name}
                          </p>
                          <button
                            onClick={() => handleEditSector(sector)}
                            className="px-2 hover:bg-gray-300 rounded-md cursor-pointer py-1 duration-300 text-primaryGreen"
                          >
                            <IoPencil className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteSector(sector)}
                          className="px-2 hover:bg-red-500 hover:text-white rounded-md cursor-pointer py-1 duration-300"
                        >
                          <IoTrash className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-xs">
                        Source: {sector.source ? sector.source : "-"}
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
