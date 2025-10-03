/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { IoAdd, IoClose, IoPencil, IoSave, IoTrash } from "react-icons/io5";
import formatRupiah from "../../../utils/formatRupiah";
import {
  Document,
  ItemJobSection,
  JobSection,
} from "../../../types/Documents.type";
import ExcelJS from "exceljs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../service/Api";
import { KeyedMutator } from "swr";

interface FormData {
  percentage?: string | number;
}

interface TableProps {
  handleCreateSection: () => Promise<void>;
  handleUpdateSection: (section: JobSection) => Promise<void>;
  handleDeleteSection: (section: JobSection) => Promise<void>;
  handleCreateItemJob: (section: JobSection) => Promise<void>;
  handleUpdateItemJob: (
    item: ItemJobSection,
    section: JobSection
  ) => Promise<void>;
  handleDeleteItemJob: (item: ItemJobSection) => Promise<void>;
  dataDetail: Document;
  mutateDetail: KeyedMutator<any>;
}

export default function Table({
  handleCreateSection,
  handleUpdateSection,
  handleDeleteSection,
  handleCreateItemJob,
  handleUpdateItemJob,
  handleDeleteItemJob,
  dataDetail,
  mutateDetail,
}: TableProps) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm<FormData>({});

  const handleCancel = () => {
    setEditMode(false);
    reset();
  };

  useEffect(() => {
    if (editMode) {
      if (dataDetail.percentageBenefitsAndRisks) {
        reset({
          percentage: dataDetail.percentageBenefitsAndRisks || "0",
        });
      }
    }
    if (dataDetail.percentageBenefitsAndRisks) {
      reset({
        percentage: dataDetail.percentageBenefitsAndRisks || "0",
      });
    }
  }, [editMode, dataDetail, reset]);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();

    // Menambahkan metadata pada workbook
    workbook.creator = "Me";
    workbook.lastModifiedBy = "Her";
    workbook.created = new Date(1985, 8, 30); // Tanggal pembuatan (September 30, 1985)
    workbook.modified = new Date(); // Tanggal terakhir dimodifikasi (saat ini)

    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.addRow([]);

    // Menambahkan teks di atas tabel (OWNER ESTIMATE)
    const titleRow = worksheet.addRow(["", "OWNER ESTIMATE (OE)"]);
    titleRow.font = { bold: true, size: 12 };

    const jobRow = worksheet.addRow(["PEKERJAAN", `: ${dataDetail.job}`]);
    jobRow.font = { bold: true, size: 12 };

    const locationRow = worksheet.addRow([
      "LOKASI",
      `: ${dataDetail.location}`,
    ]);
    locationRow.font = { bold: true, size: 12 };

    const baseRow = worksheet.addRow(["DASAR", `: ${dataDetail.base}`]);
    worksheet.mergeCells(baseRow.number, 4, baseRow.number, 5);
    baseRow.font = { bold: true, size: 12 };

    worksheet.addRow([]);

    const headers: any = [
      "No",
      "Uraian Pekerjaan",
      "Volume",
      "Material (IDR)",
      "Jasa (IDR)",
      "Total Material (IDR)",
      "Total Jasa (IDR)",
      "Informasi",
    ];

    // Menambahkan header ke worksheet
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Set column widths based on header lengths or data
    worksheet.columns = [
      { width: 15 }, // No
      { width: 100 }, // Uraian Pekerjaan
      { width: 15 }, // Volume
      { width: 20 }, // Material
      { width: 20 }, // Jasa
      { width: 20 }, // Total Material
      { width: 20 }, // Total Jasa
      { width: 50 }, // Informasi
    ];

    // Applying data rows for job sections
    dataDetail.jobSections.forEach((jobSection, sectionIndex) => {
      const row = [
        String.fromCharCode(65 + sectionIndex),
        jobSection.name,
        "",
        "",
        "",
        jobSection.totalMaterialPrice,
        jobSection.totalFeePrice,
        "",
      ];
      const jobSectionRow = worksheet.addRow(row);
      worksheet.mergeCells(jobSectionRow.number, 2, jobSectionRow.number, 5);

      jobSectionRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "BFBFBF" },
        };
        cell.font = { bold: true };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      jobSectionRow.getCell(1).alignment = { horizontal: "center" };

      // Applying data rows for item job sections
      jobSection.itemJobSections.forEach((item, itemIndex) => {
        const itemRow = [
          itemIndex + 1,
          item.name,
          `${item.volume} ${item.unit}`,
          item.materialPricePerUnit,
          item.feePricePerUnit,
          item.totalMaterialPrice,
          item.totalFeePrice,
          item.information,
        ];
        const itemRowAdded = worksheet.addRow(itemRow);

        itemRowAdded.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
        itemRowAdded.getCell(1).alignment = { horizontal: "center" };
        itemRowAdded.getCell(3).alignment = { horizontal: "center" };
      });
    });

    // Rekapitulasi
    const rekapitulasi = ["", "Rekapitulasi"];
    const rekapitulasiRow = worksheet.addRow(rekapitulasi);
    worksheet.mergeCells(rekapitulasiRow.number, 2, rekapitulasiRow.number, 8);
    rekapitulasiRow.getCell(2).font = { bold: true };
    rekapitulasiRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Rekapitulasi JobSection
    dataDetail.jobSections.forEach((jobSection, sectionIndex) => {
      const row = [
        String.fromCharCode(65 + sectionIndex),
        jobSection.name,
        "",
        "",
        "",
        jobSection.totalMaterialPrice,
        jobSection.totalFeePrice,
        "",
      ];
      const jobSectionRow = worksheet.addRow(row);
      worksheet.mergeCells(jobSectionRow.number, 2, jobSectionRow.number, 5);

      jobSectionRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "BFBFBF" },
        };
        cell.font = { bold: true };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      jobSectionRow.getCell(1).alignment = { horizontal: "center" };
    });

    // blankRow
    const blank = ["", ""];
    const blankRow = worksheet.addRow(blank);
    worksheet.mergeCells(blankRow.number, 2, blankRow.number, 8);
    blankRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // totalMaterialAndFee
    const totalMaterialAndFee = [
      "",
      "TOTAL MATERIAL / JASA",
      "",
      "",
      "",
      dataDetail.totalMaterialPrice,
      dataDetail.totalFeePrice,
      "",
    ];
    const totalMaterialAndFeeRow = worksheet.addRow(totalMaterialAndFee);
    worksheet.mergeCells(
      totalMaterialAndFeeRow.number,
      2,
      totalMaterialAndFeeRow.number,
      5
    );
    totalMaterialAndFeeRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // totalMaterialPlusFee
    const totalMaterialPlusFee = [
      "",
      "TOTAL MATERIAL + JASA",
      "",
      "",
      "",
      "",
      dataDetail.totalMaterialAndFee,
      "",
    ];
    const totalMaterialPlusFeeRow = worksheet.addRow(totalMaterialPlusFee);
    worksheet.mergeCells(
      totalMaterialPlusFeeRow.number,
      2,
      totalMaterialPlusFeeRow.number,
      5
    );
    totalMaterialPlusFeeRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // rounding
    // const rounding = ["", "PEMBULATAN", "", "", "", "", "Rp. #####", ""];
    // const roundingRow = worksheet.addRow(rounding);
    // roundingRow.eachCell((cell) => {
    //   cell.fill = {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: { argb: "BFBFBF" },
    //   };
    //   cell.font = { bold: true };
    //   cell.border = {
    //     top: { style: "thin" },
    //     left: { style: "thin" },
    //     bottom: { style: "thin" },
    //     right: { style: "thin" },
    //   };
    // });

    // benefitsAndRisks
    const benefitsAndRisks = [
      "",
      "K&R (KEUNTUNGAN & RISIKO) ",
      `${dataDetail.percentageBenefitsAndRisks} %`,
      "",
      "",
      "",
      dataDetail.totalBenefitsAndRisks,
      "",
    ];
    const benefitsAndRisksRow = worksheet.addRow(benefitsAndRisks);
    benefitsAndRisksRow.getCell(3).alignment = { horizontal: "center" };

    benefitsAndRisksRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // totalMaterialFeeBr
    const totalMaterialFeeBr = [
      "",
      "TOTAL MATERIAL + JASA + K&R",
      "",
      "",
      dataDetail.totalPrice,
      "",
      "",
      "",
    ];
    const totalMaterialFeeBrRow = worksheet.addRow(totalMaterialFeeBr);
    worksheet.mergeCells(
      totalMaterialFeeBrRow.number,
      5,
      totalMaterialFeeBrRow.number,
      7
    );
    totalMaterialFeeBrRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // spelledOut
    const spelledOut = ["", "TERBILANG", "", "", "", "", "", ""];
    const spelledOutRow = worksheet.addRow(spelledOut);
    worksheet.mergeCells(spelledOutRow.number, 6, spelledOutRow.number, 7);
    spelledOutRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Menghasilkan file Excel dan menyiapkan untuk diunduh
    const buffer = await workbook.xlsx.writeBuffer();

    // Membuat URL untuk unduhan
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dataDetail.name}.xlsx`; // Nama file yang akan diunduh
    a.click(); // Memulai proses unduhan
    window.URL.revokeObjectURL(url); // Membersihkan URL objek
  };

  const onSubmit = async (data: FormData) => {
    const percentage = data.percentage ? data.percentage.toString() : "0";
    try {
      setLoading(true);
      const api = new Api();
      api.url = `document/update/percentage/${dataDetail.slug}`;
      api.method = "PATCH";
      api.type = "json";

      api.body = {
        percentageBenefitsAndRisks: parseFloat(percentage),
      };
      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setEditMode(false);
        mutateDetail();
        reset();
      } else {
        if (response.message && Array.isArray(response.message)) {
          response.message.forEach((error: string) => {
            toast.error(error);
          });
        } else {
          toast.error(response.message);
        }
      }
    } catch (error: any) {
      toast.error("Error updating document: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
            onClick={handleExport}
          >
            <div className="w-4 h-4">
              <IoSave className="w-full h-full" />
            </div>
            <span className="text-xs font-semibold">Unduh Excel</span>
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-center text-black text-xs" align="center">
          <thead className="text-xs text-white uppercase bg-primaryBlue">
            <tr>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                No
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Uraian Pekerjaan
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Volume
              </th>
              <th scope="col" colSpan={2} className="px-2 py-1.5">
                Harga Unit
              </th>
              <th scope="col" colSpan={2} className="px-2 py-1.5">
                Total Harga
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Informasi
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Aksi
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-2 py-1.5">
                Material
              </th>
              <th scope="col" className="px-2 py-1.5">
                Jasa
              </th>
              <th scope="col" className="px-2 py-1.5">
                Material
              </th>
              <th scope="col" className="px-2 py-1.5">
                Jasa
              </th>
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {dataDetail.jobSections.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-3">
                  Tidak ada bagian pekerjaan yang tersedia. Tambahkan bagian
                  pekerjaan untuk memulai.
                </td>
              </tr>
            ) : (
              dataDetail.jobSections.map(
                (jobSection: JobSection, index: number) => (
                  <React.Fragment key={jobSection.id}>
                    <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
                      <td className="px-6 py-3">
                        {String.fromCharCode(65 + index)}
                      </td>
                      <td className="px-6 py-3">{jobSection.name}</td>
                      <td className="px-6 py-3"></td>
                      <td className="px-6 py-3"></td>
                      <td className="px-6 py-1.5"></td>
                      <td className="px-6 py-3">
                        {formatRupiah(jobSection.totalMaterialPrice)}
                      </td>
                      <td className="px-6 py-3">
                        {formatRupiah(jobSection.totalFeePrice)}
                      </td>
                      <td className="px-6 py-3"></td>
                      <td className="px-6 py-3 flex items-center gap-2 justify-center">
                        <button
                          onClick={() => handleUpdateSection(jobSection)}
                          className="text-white bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                        >
                          <div className="w-4 h-4">
                            <IoPencil className="w-full h-full" />
                          </div>
                        </button>
                        <button
                          onClick={() => handleDeleteSection(jobSection)}
                          className="text-white bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                        >
                          <div className="w-4 h-4">
                            <IoTrash className="w-full h-full" />
                          </div>
                        </button>
                      </td>
                    </tr>
                    {jobSection.itemJobSections.length > 0 &&
                      jobSection.itemJobSections.map((item, index: number) => (
                        <tr
                          key={item.id}
                          className="odd:bg-gray-100 even:bg-gray-50 font-normal"
                        >
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">{item.name}</td>
                          <td className="px-6 py-3">
                            {item.volume} {item.unit}
                          </td>
                          <td className="px-6 py-3">
                            {formatRupiah(item.materialPricePerUnit)}
                          </td>
                          <td className="px-6 py-1.5">
                            {formatRupiah(item.feePricePerUnit)}
                          </td>
                          <td className="px-6 py-3">
                            {formatRupiah(item.totalMaterialPrice)}
                          </td>
                          <td className="px-6 py-3">
                            {formatRupiah(item.totalFeePrice)}
                          </td>
                          <td className="px-6 py-3">{item.information}</td>
                          <td className="px-6 py-3 flex items-center gap-2 justify-center">
                            <button
                              onClick={() =>
                                handleUpdateItemJob(item, jobSection)
                              }
                              className="text-white bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                            >
                              <div className="w-4 h-4">
                                <IoPencil className="w-full h-full" />
                              </div>
                            </button>
                            <button
                              onClick={() => handleDeleteItemJob(item)}
                              className="text-white bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                            >
                              <div className="w-4 h-4">
                                <IoTrash className="w-full h-full" />
                              </div>
                            </button>
                          </td>
                        </tr>
                      ))}
                    <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
                      <td></td>
                      <td className="px-6 py-3 flex justify-center  w-full">
                        <button
                          className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
                          onClick={() => handleCreateItemJob(jobSection)}
                        >
                          <div className="w-4 h-4">
                            <IoAdd className="w-full h-full" />
                          </div>
                          <span className="text-xs font-semibold">
                            Tambah Pekerjaan
                          </span>
                        </button>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </React.Fragment>
                )
              )
            )}
            <tr className="bg-blue-100 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3 flex justify-center">
                <button
                  className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
                  onClick={handleCreateSection}
                >
                  <div className="w-4 h-4">
                    <IoAdd className="w-full h-full" />
                  </div>
                  <span className="text-xs font-semibold">
                    Tambah Sektor Pekerjaan
                  </span>
                </button>
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">Rekapitulasi</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            {dataDetail.jobSections.map(
              (jobSection: JobSection, index: number) => (
                <React.Fragment key={jobSection.id}>
                  <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
                    <td className="px-6 py-3">
                      {String.fromCharCode(65 + index)}
                    </td>
                    <td className="px-6 py-3">{jobSection.name}</td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3">
                      {formatRupiah(jobSection.totalMaterialPrice)}
                    </td>
                    <td className="px-6 py-3">
                      {formatRupiah(jobSection.totalFeePrice)}
                    </td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3"></td>
                  </tr>
                </React.Fragment>
              )
            )}
            <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">TOTAL MATERIAL / JASA</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">
                {formatRupiah(dataDetail.totalMaterialPrice)}
              </td>
              <td className="px-6 py-3">
                {formatRupiah(dataDetail.totalFeePrice)}
              </td>

              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">TOTAL MATERIAL + JASA</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">
                {formatRupiah(dataDetail.totalMaterialAndFee)}
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">K&R (KEUNTUNGAN & RESIKO)</td>
              <td className="px-6 py-3">
                {!editMode ? (
                  `${dataDetail.percentageBenefitsAndRisks} %`
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      readOnly={!editMode}
                      type="number"
                      min={0}
                      defaultValue={dataDetail.percentageBenefitsAndRisks}
                      className={`focus:outline-0 w-10 ${
                        editMode && "border-b"
                      } `}
                      {...register("percentage")}
                    />{" "}
                    %
                  </form>
                )}
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">
                {formatRupiah(dataDetail.totalBenefitsAndRisks)}
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3 flex items-center gap-2 justify-center">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-white bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                  >
                    <div className="w-4 h-4">
                      <IoPencil className="w-full h-full" />
                    </div>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit(onSubmit)}
                      disabled={loading}
                      className="text-white bg-primaryBlue disabled:bg-primaryBlueLighter hover:bg-primaryBlueDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                    >
                      <div className="w-4 h-4">
                        <IoSave className="w-full h-full" />
                      </div>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="text-white bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                    >
                      <div className="w-4 h-4">
                        <IoClose className="w-full h-full" />
                      </div>
                    </button>
                  </>
                )}
              </td>
            </tr>
            {/* <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">PEMBULATAN</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr> */}

            {/* <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">
                INSPEKSI DAN VERIFIKASI TKDN OLEH SURVEYOR INDEPENDEN
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr> */}
            <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">TOTAL MATERIAL + JASA + K&R</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">
                {formatRupiah(dataDetail.totalPrice)}
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            {/* <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">TERBILANG</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
