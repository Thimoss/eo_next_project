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

interface DetailDocumentProps {
  slug: string;
}
export default function ClientSide({ slug }: DetailDocumentProps) {
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
  } = UseDetailDocument({ slug });

  console.log(dataDetail);

  return (
    <>
      {isLoadingDetail ? (
        <Loading />
      ) : dataDetail ? (
        <>
          <div className="flex flex-col gap-5">
            <DocumentInformation
              location={dataDetail.location}
              base={dataDetail.base}
              job={dataDetail.job}
              slug={slug}
              mutate={mutateDetail}
            />
            <Table
              handleCreateSection={handleCreateSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              handleCreateItemJob={handleCreateItemJob}
              handleUpdateItemJob={handleUpdateItemJob}
              dataDetail={dataDetail}
            />
          </div>
          <CreateModalSection
            mutate={mutateDetail}
            open={openCreateSection}
            setOpen={setOpenCreateSection}
            documentId={dataDetail?.id}
          />
          <UpdateModalSection
            open={openUpdateSection}
            setOpen={setOpenUpdateSection}
            mutate={mutateDetail}
            selectedJobSection={selectedJobSection}
            documentId={dataDetail?.id}
          />
          <DeleteModalSection
            open={openDeleteSection}
            setOpen={setOpenDeleteSection}
            mutate={mutateDetail}
            selectedJobSection={selectedJobSection}
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
          />
        </>
      ) : (
        <div>Data Tidak ada</div>
      )}
    </>
  );
}
