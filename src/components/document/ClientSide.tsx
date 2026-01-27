"use client";
import React, { useRef, useState } from "react";
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
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
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
  const printRef = useRef<HTMLDivElement | null>(null);
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

  const handleDownloadPdfFromUi = async () => {
    if (!printRef.current) {
      toast.error("Gagal menyiapkan tampilan untuk PDF.");
      return;
    }

    let tempWrapper: HTMLDivElement | null = null;

    const A4_LANDSCAPE_WIDTH_PX = 1123;
    const A4_LANDSCAPE_HEIGHT_PX = 794;

    try {
      setDownloadLoading(true);
      const element = printRef.current;
      tempWrapper = document.createElement("div");
      tempWrapper.style.position = "fixed";
      tempWrapper.style.top = "0";
      tempWrapper.style.left = "-10000px";
      tempWrapper.style.width = `${A4_LANDSCAPE_WIDTH_PX}px`;
      tempWrapper.style.minHeight = `${A4_LANDSCAPE_HEIGHT_PX}px`;
      tempWrapper.style.opacity = "1";
      tempWrapper.style.zIndex = "0";
      tempWrapper.style.overflow = "visible";
      tempWrapper.style.background = "#ffffff";
      tempWrapper.style.pointerEvents = "none";
      tempWrapper.style.padding = "24px 32px";

      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.width = `${A4_LANDSCAPE_WIDTH_PX}px`;
      clone.style.minHeight = `${A4_LANDSCAPE_HEIGHT_PX}px`;
      clone.style.maxWidth = "none";
      clone.style.overflow = "visible";
      clone.style.paddingBottom = "24px";
      const overflowNodes = Array.from(
        clone.querySelectorAll<HTMLElement>(
          "[class*='overflow-x'], [class*='overflow-y']",
        ),
      );
      overflowNodes.forEach((node) => {
        node.style.overflow = "visible";
        node.style.overflowX = "visible";
        node.style.overflowY = "visible";
        node.style.width = "auto";
        node.style.maxWidth = "none";
      });

      tempWrapper.appendChild(clone);
      document.body.appendChild(tempWrapper);

      const contentHeight = Math.max(
        A4_LANDSCAPE_HEIGHT_PX,
        clone.scrollHeight + 48,
      );
      tempWrapper.style.height = `${contentHeight}px`;
      tempWrapper.style.minHeight = `${contentHeight}px`;

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const canvas = await html2canvas(tempWrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: A4_LANDSCAPE_WIDTH_PX,
        windowHeight: Math.max(contentHeight, tempWrapper.scrollHeight),
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const renderWidth = imgWidth * ratio;
      const renderHeight = imgHeight * ratio;
      const offsetX = (pageWidth - renderWidth) / 2;
      const offsetY = (pageHeight - renderHeight) / 2;

      pdf.addImage(imgData, "PNG", offsetX, offsetY, renderWidth, renderHeight);
      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("file", pdfBlob, `document-${slug}.pdf`);

      const api = new Api();
      const response = await fetch(
        `${api.baseUrl}document/download-pdf-ui/${slug}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${validAccessToken}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const finalBlob = await response.blob();
      const url = window.URL.createObjectURL(finalBlob);
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
      if (tempWrapper) {
        tempWrapper.remove();
      }
      setDownloadLoading(false);
    }
  };

  return (
    <>
      {isLoadingDetail ? (
        <Loading />
      ) : dataDetail ? (
        <>
          <div ref={printRef} className="flex flex-col gap-8 bg-white">
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
              onDownloadPdf={handleDownloadPdfFromUi}
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
