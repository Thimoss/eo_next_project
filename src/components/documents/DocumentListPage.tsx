"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SortBy from "../dashboard/SortBy";
import DocumentCard from "../dashboard/DocumentCard";
import Loading from "../global/Loading";
import { useDocumentList } from "../../../hooks/DocumentList";
import { Document } from "../../../types/Documents.type";
import { UserSession } from "../../../types/Session.type";
import CreateModal from "../dashboard/CreateModal";
import UpdateModal from "../dashboard/UpdateModal";
import DeleteModal from "../dashboard/DeleteModal";

interface DocumentListPageProps {
  title: string;
  description: string;
  scope: "created" | "review" | "confirm";
  accessToken?: string;
  session?: UserSession | null;
}

export default function DocumentListPage({
  title,
  description,
  scope,
  accessToken,
  session,
}: DocumentListPageProps) {
  const allowManage = scope === "created";
  const {
    data,
    isLoading,
    mutate,
    sortBy,
    isSortByOpen,
    handleSelect,
    toggleDropdown,
    dropdownRef,
    handleDetail,
  } = useDocumentList({ accessToken, scope });

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document>();

  const handleEdit = async (document: Document) => {
    setSelectedDocument(document);
    setOpenEdit(true);
  };

  const handleDelete = async (document: Document) => {
    setSelectedDocument(document);
    setOpenDelete(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <section className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-8">
          <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-primaryBlue/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-0 h-44 w-44 rounded-full bg-primaryGreen/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primaryBlue">
                Dokumen
              </p>
              <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primaryGreen" />
                {isLoading ? "Memuat..." : `${data.length} Dokumen`}
              </div>
              {allowManage && (
                <button
                  onClick={() => setOpenCreate(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primaryGreen px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] transition duration-200 hover:bg-primaryGreenDarker sm:w-auto"
                >
                  <FaPlus className="h-4 w-4" />
                  Tambah Dokumen
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {data.map((document: Document) => (
                <DocumentCard
                  document={document}
                  key={document.id}
                  handleDetail={handleDetail}
                  handleEdit={allowManage ? handleEdit : undefined}
                  handleDelete={allowManage ? handleDelete : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200/70 bg-white p-6 text-center text-sm font-semibold text-gray-600 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
              Belum ada dokumen untuk ditampilkan.
            </div>
          )}
        </div>
      </div>

      {allowManage && (
        <>
          <CreateModal
            open={openCreate}
            setOpen={setOpenCreate}
            mutate={mutate}
            accessToken={accessToken}
            session={session}
          />
          <UpdateModal
            open={openEdit}
            setOpen={setOpenEdit}
            mutate={mutate}
            selectedDocument={selectedDocument}
            accessToken={accessToken}
            session={session}
          />
          <DeleteModal
            open={openDelete}
            setOpen={setOpenDelete}
            mutate={mutate}
            selectedDocument={selectedDocument}
            accessToken={accessToken}
          />
        </>
      )}
    </>
  );
}
