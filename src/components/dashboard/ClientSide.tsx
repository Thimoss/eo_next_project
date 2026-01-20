"use client";
import React from "react";
import Link from "next/link";
import DocumentCard from "./DocumentCard";
import { useDashboard } from "../../../hooks/Dashboard";
import Loading from "../global/Loading";
import { Document } from "../../../types/Documents.type";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { UserSession } from "../../../types/Session.type";
import DashboardHeader from "./DashboardHeader";

interface ClientSideProps {
  session?: UserSession | null;
  accessToken?: string;
}

export default function ClientSide({ session, accessToken }: ClientSideProps) {
  const validSession = session ?? undefined;
  const validAccessToken = accessToken ?? "";
  const {
    createdDocs,
    reviewDocs,
    confirmDocs,
    isLoading,
    mutateCreated,
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
  const totalLabel = isLoading
    ? "Memuat..."
    : "Dokumen Anda";

  return (
    <>
      <div className="flex flex-col gap-8">
        <DashboardHeader
          totalLabel={totalLabel}
          onCreate={() => setOpenCreate(true)}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-6">
            <section className="rounded-3xl border border-gray-200/70 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Dokumen Saya
                  </h2>
                 
                </div>
                <Link
                  href="/documents/my"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
                >
                  Lihat semua
                </Link>
              </div>
              {createdDocs.length > 0 ? (
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {createdDocs.map((document: Document) => (
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
                <div className="mt-4 rounded-2xl border border-gray-200/70 bg-gray-50/70 p-4 text-sm text-gray-600">
                  Belum ada dokumen yang dibuat.
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-gray-200/70 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Perlu Review
                  </h2>
                 
                </div>
                <Link
                  href="/documents/review"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
                >
                  Lihat semua
                </Link>
              </div>
              {reviewDocs.length > 0 ? (
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {reviewDocs.map((document: Document) => (
                    <DocumentCard
                      document={document}
                      key={document.id}
                      handleDetail={handleDetail}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-gray-200/70 bg-gray-50/70 p-4 text-sm text-gray-600">
                  Tidak ada dokumen untuk direview.
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-gray-200/70 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Perlu Konfirmasi
                  </h2>
               
                </div>
                <Link
                  href="/documents/confirm"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
                >
                  Lihat semua
                </Link>
              </div>
              {confirmDocs.length > 0 ? (
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {confirmDocs.map((document: Document) => (
                    <DocumentCard
                      document={document}
                      key={document.id}
                      handleDetail={handleDetail}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-gray-200/70 bg-gray-50/70 p-4 text-sm text-gray-600">
                  Tidak ada dokumen untuk dikonfirmasi.
                </div>
              )}
            </section>
          </div>
        )}
      </div>
      <CreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        mutate={mutateCreated}
        accessToken={accessToken}
        session={session}
      />
      <UpdateModal
        open={openEdit}
        setOpen={setOpenEdit}
        mutate={mutateCreated}
        selectedDocument={selectedDocument}
        accessToken={accessToken}
        session={session}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        mutate={mutateCreated}
        selectedDocument={selectedDocument}
        accessToken={accessToken}
      />
    </>
  );
}
