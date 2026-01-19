"use client";
import React from "react";
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

interface DetailDocumentProps {
  slug: string;
  accessToken?: string;
}
export default function ClientSide({ slug, accessToken }: DetailDocumentProps) {
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

  console.log(dataDetail);

  return (
    <>
      {isLoadingDetail ? (
        <Loading />
      ) : dataDetail ? (
        <>
          <div className="flex flex-col gap-8">
            <DocumentInformation
              location={dataDetail.location}
              base={dataDetail.base}
              job={dataDetail.job}
              slug={slug}
              mutate={mutateDetail}
              accessToken={accessToken}
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
            />
            <DocumentApproval
              recapitulationLocation={dataDetail.recapitulationLocation}
              confirmedBy={dataDetail.confirmedBy}
              checkedBy={dataDetail.checkedBy}
              preparedBy={dataDetail.createdBy}
              mutate={mutateDetail}
              slug={slug}
              accessToken={accessToken}
            />
          </div>
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
      ) : (
        <div className="rounded-2xl border border-gray-200/70 bg-white p-6 text-center text-sm font-semibold text-gray-600 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
          Data tidak ditemukan.
        </div>
      )}
    </>
  );
}
