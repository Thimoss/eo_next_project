"use client";
import React from "react";
import SortBy from "./SortBy";
import DocumentCard from "./DocumentCard";
import { useDashboard } from "../../../hooks/Dashboard";
import Loading from "../global/Loading";
import EmptyData from "../global/EmptyData";
import { Document } from "../../../types/Documents.type";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { UserSession } from "../../../types/Session.type";
import SearchBar from "../global/SearchBar";
import DashboardHeader from "./DashboardHeader";

interface ClientSideProps {
  session?: UserSession | null;
  accessToken?: string;
}

export default function ClientSide({ session, accessToken }: ClientSideProps) {
  const validSession = session ?? undefined;
  const validAccessToken = accessToken ?? "";
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
  } = useDashboard({ session: validSession, accessToken: validAccessToken });
  const totalDocuments = data?.length ?? 0;
  const totalLabel = isLoading ? "Memuat..." : `${totalDocuments} Dokumen`;
  const hasData = totalDocuments > 0;

  return (
    <>
      <div className="flex flex-col gap-8">
        <DashboardHeader
          totalLabel={totalLabel}
          onCreate={() => setOpenCreate(true)}
        />

        <div className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <SearchBar
              placeholder="Cari dokumen..."
              showAction={false}
              containerClassName="sm:max-w-lg"
            />
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
          ) : hasData ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {(data ?? []).map((document: Document) => (
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
      </div>
      <CreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        mutate={mutate}
        accessToken={accessToken}
      />
      <UpdateModal
        open={openEdit}
        setOpen={setOpenEdit}
        mutate={mutate}
        selectedDocument={selectedDocument}
        accessToken={accessToken}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        mutate={mutate}
        selectedDocument={selectedDocument}
        accessToken={accessToken}
      />
    </>
  );
}
