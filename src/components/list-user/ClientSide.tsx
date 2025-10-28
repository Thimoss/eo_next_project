"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";
import Loading from "../global/Loading";
import EmptyData from "../global/EmptyData";
import CreateModal from "./CreateModal";
import { useUsers } from "../../../hooks/Users";
import Table from "./Table";

export default function ClientSide() {
  const { openCreate, setOpenCreate } = useUsers();
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl text-gray-700 font-bold">Daftar Pengguna</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
          {/* <Search /> */}
          <div className="flex justify-end w-full">
            <button
              //   onClick={() => setOpenCreate(true)}
              className="px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2 shadow-sm"
            >
              <div className="w-4 h-4">
                <FaPlus className="w-full h-full" />
              </div>
              <span className="text-sm font-semibold">Tambah</span>
            </button>
          </div>
        </div>

        <div>
          <Loading />
        </div>
        <div className="flex flex-col gap-6">
          <Table />
          {/* <Pagination /> */}
        </div>
        <div>
          <EmptyData />
        </div>
      </div>
      <CreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        //   mutate={mutate}
      />
    </>
  );
}
