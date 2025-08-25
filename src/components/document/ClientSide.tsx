"use client";
import React from "react";
import DocumentInformation from "./DocumentInformation";
import { UseDetailDocument } from "../../../hooks/Documents";
import Loading from "../global/Loading";
import Table from "./Table";
import CreateModalSection from "./CreateModalSection";
import UpdateModalSection from "./UpdateModalSection";
import DeleteModalSection from "./DeleteModalSection";

interface DetailDocumentProps {
  slug: string;
}
export default function ClientSide({ slug }: DetailDocumentProps) {
  const {
    dataDetail,
    errorDetail,
    isLoadingDetail,
    mutateDetail,
    openCreateSection,
    setOpenCreateSection,
    // openDeleteSection,
    // setOpenDeleteSection,
    openUpdateSection,
    setOpenUpdateSection,
    handleUpdateSection,
    selectedJobSection,
    handleCreateSection,
  } = UseDetailDocument({ slug });

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
              jobSections={dataDetail.jobSections}
              handleUpdateSection={handleUpdateSection}
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
          <DeleteModalSection />
        </>
      ) : (
        <div>Data Tidak ada</div>
      )}
    </>
  );
}
