"use client";
import React, { useState } from "react";
import DocumentInformation from "./DocumentInformation";
import { UseDetailDocument } from "../../../hooks/Documents";
import Loading from "../global/Loading";
import Table from "./Table";
import CreateModalSection from "./CreateModalSection";
import UpdateModalSection from "./UpdateModalSection";
import DeleteModalSection from "./DeleteModalSection";
import CreateModalItem from "./CreateModalItem";
import UpdateModalItem from "./UpdateModalItem";
import DeleteModalItem from "./DeleteModalItem";
import DocumentApproval from "./DocumentApproval";
import { UserSession } from "../../../types/Session.type";
import { toast } from "react-toastify";
import Api from "../../../service/Api";

interface DetailDocumentProps {
  slug: string;
  accessToken?: string;
  session?: UserSession | null;
}
export default function ClientSide({
  slug,
  accessToken,
  session,
}: DetailDocumentProps) {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const validAccessToken = accessToken ?? "";
  const {
    dataDetail,
    isLoadingDetail,
    mutateDetail,
    openCreateSection,
    setOpenCreateSection,
    openDeleteSection,
    setOpenDeleteSection,
    openUpdateSection,
    setOpenUpdateSection,
    handleUpdateSection,
    selectedJobSection,
    handleCreateSection,
    handleDeleteSection,
    openCreateItem,
    setOpenCreateItem,
    openUpdateItem,
    setOpenUpdateItem,
    openDeleteItem,
    setOpenDeleteItem,
    handleCreateItemJob,
    dataSearch,
    isLoadingSearch,
    handleSelectItem,
    keyword,
    handleSearch,
    openSearchDropDown,
    handleShowList,
    selectedNewItemJob,
    selectedOldItemJob,
    setSelectedNewItemJob,
    setSelectedOldItemJob,
    setKeyword,
    handleVolumeChange,
    volume,
    itemRef,
    handleUpdateItemJob,
    selectedIdItemJob,
    setSelectedIdItemJob,
    handleDeleteItemJob,
  } = UseDetailDocument({
    slug,
    accessToken: validAccessToken,
  });

  const ownerId = dataDetail?.createdById ?? dataDetail?.createdBy?.id;
  const canEdit = Boolean(
    session &&
    ownerId &&
    session.id === ownerId &&
    dataDetail?.status === "IN_PROGRESS",
  );

  const handleDownloadPdf = async () => {
    try {
      setDownloadLoading(true);

      const api = new Api();
      const response = await fetch(
        `${api.baseUrl}document/download-pdf/${slug}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${validAccessToken}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `document-${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("PDF berhasil diunduh");
    } catch (error: unknown) {
      toast.error(
        "Gagal mengunduh PDF: " +
          (error instanceof Error ? error.message : String(error)),
      );
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <>
      {isLoadingDetail ? (
        <Loading />
      ) : dataDetail ? (
        <>
          <div className="flex flex-col gap-8 bg-white">
            <DocumentInformation
              location={dataDetail.location}
              base={dataDetail.base}
              job={dataDetail.job}
              slug={slug}
              mutate={mutateDetail}
              accessToken={accessToken}
              canEdit={canEdit}
            />
            <Table
              handleCreateSection={handleCreateSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              handleCreateItemJob={handleCreateItemJob}
              handleUpdateItemJob={handleUpdateItemJob}
              handleDeleteItemJob={handleDeleteItemJob}
              dataDetail={dataDetail}
              mutateDetail={mutateDetail}
              accessToken={accessToken}
              canEdit={canEdit}
            />
            <DocumentApproval
              recapitulationLocation={dataDetail.recapitulationLocation}
              confirmedBy={dataDetail.confirmedBy}
              checkedBy={dataDetail.checkedBy}
              preparedBy={dataDetail.createdBy}
              status={dataDetail.status}
              mutate={mutateDetail}
              slug={slug}
              accessToken={accessToken}
              canEdit={canEdit}
              session={session}
              onDownloadPdf={handleDownloadPdf}
              downloadLoading={downloadLoading}
            />
          </div>
          {canEdit && (
            <>
              <CreateModalSection
                mutate={mutateDetail}
                open={openCreateSection}
                setOpen={setOpenCreateSection}
                documentId={dataDetail?.id}
                accessToken={accessToken}
              />
              <UpdateModalSection
                open={openUpdateSection}
                setOpen={setOpenUpdateSection}
                mutate={mutateDetail}
                selectedJobSection={selectedJobSection}
                documentId={dataDetail?.id}
                accessToken={accessToken}
              />
              <DeleteModalSection
                open={openDeleteSection}
                setOpen={setOpenDeleteSection}
                mutate={mutateDetail}
                selectedJobSection={selectedJobSection}
                accessToken={accessToken}
              />
              <CreateModalItem
                open={openCreateItem}
                setOpen={setOpenCreateItem}
                dataSearch={dataSearch}
                isLoadingSearch={isLoadingSearch}
                handleSelectItem={handleSelectItem}
                keyword={keyword}
                handleSearch={handleSearch}
                handleShowList={handleShowList}
                openSearchDropDown={openSearchDropDown}
                selectedNewItemJob={selectedNewItemJob}
                mutateDetail={mutateDetail}
                setSelectedNewItemJob={setSelectedNewItemJob}
                setKeyword={setKeyword}
                handleVolumeChange={handleVolumeChange}
                volume={volume}
                itemRef={itemRef}
                selectedJobSection={selectedJobSection}
                accessToken={accessToken}
              />
              <UpdateModalItem
                open={openUpdateItem}
                setOpen={setOpenUpdateItem}
                dataSearch={dataSearch}
                isLoadingSearch={isLoadingSearch}
                handleSelectItem={handleSelectItem}
                keyword={keyword}
                handleSearch={handleSearch}
                handleShowList={handleShowList}
                openSearchDropDown={openSearchDropDown}
                mutateDetail={mutateDetail}
                setKeyword={setKeyword}
                handleVolumeChange={handleVolumeChange}
                volume={volume}
                itemRef={itemRef}
                selectedJobSection={selectedJobSection}
                selectedOldItemJob={selectedOldItemJob}
                selectedNewItemJob={selectedNewItemJob}
                setSelectedNewItemJob={setSelectedNewItemJob}
                setSelectedOldItemJob={setSelectedOldItemJob}
                selectedIdItemJob={selectedIdItemJob}
                setSelectedIdItemJob={setSelectedIdItemJob}
                accessToken={accessToken}
              />
              <DeleteModalItem
                mutate={mutateDetail}
                open={openDeleteItem}
                setOpen={setOpenDeleteItem}
                selectedOldItemJob={selectedOldItemJob}
                accessToken={accessToken}
              />
            </>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-gray-200/70 bg-white p-6 text-center text-sm font-semibold text-gray-600 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
          Data tidak ditemukan.
        </div>
      )}
    </>
  );
}
