"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";
import CreateModal from "./CreateModal";
import Table from "./Table";
import { useListUsers } from "../../../hooks/ListUser";
import { UserSession } from "../../../types/Session.type";
import EmptyData from "../global/EmptyData";
import Loading from "../global/Loading";
import DeleteModal from "./DeleteModal";
import ResetModal from "./ResetPassword";

interface ClientSideProps {
  session?: UserSession | null;
  accessToken?: string;
}

export default function ClientSide({ session, accessToken }: ClientSideProps) {
  const validSession = session ?? undefined;
  const validAccessToken = accessToken ?? "";

  const {
    openCreate,
    setOpenCreate,
    openReset,
    setOpenReset,
    openDelete,
    setOpenDelete,
    selectedUser,
    // setSelectedUser,
    // page,
    // setPage,
    // pageSize,
    // setPageSize,
    // searchQuery,
    // setSearchQuery,
    handleReset,
    handleDelete,
    data,
    // error,
    isLoading,
    mutate,
  } = useListUsers({
    session: validSession,
    accessToken: validAccessToken,
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl text-gray-700 font-bold">Daftar Pengguna</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
          {/* <Search /> */}

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
              users={data.list}
              handleReset={handleReset}
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

      <CreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        mutate={mutate}
        accessToken={accessToken}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        selectedUser={selectedUser}
        mutate={mutate}
        accessToken={accessToken}
      />
      <ResetModal
        open={openReset}
        setOpen={setOpenReset}
        selectedUser={selectedUser}
        mutate={mutate}
        accessToken={accessToken}
      />
    </>
  );
}
