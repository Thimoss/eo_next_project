"use client";
import React from "react";
import DocumentInformation from "./DocumentInformation";
import { UseDetailDocument } from "../../../hooks/Documents";
import Loading from "../global/Loading";
import Table from "./Table";

interface DetailDocumentProps {
  slug: string;
}
export default function ClientSide({ slug }: DetailDocumentProps) {
  const { dataDetail, errorDetail, isLoadingDetail, mutateDetail } =
    UseDetailDocument({ slug });

  return (
    <>
      {isLoadingDetail ? (
        <Loading />
      ) : dataDetail ? (
        <div className="flex flex-col gap-5">
          <DocumentInformation
            location={dataDetail.location}
            base={dataDetail.base}
            job={dataDetail.job}
          />
          <Table />
        </div>
      ) : (
        <div>Data Tidak ada</div>
      )}
    </>
  );
}
