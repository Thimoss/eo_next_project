/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { IoClose, IoPencil, IoSave, IoTrash } from "react-icons/io5";
import formatRupiah from "../../../utils/formatRupiah";
import {
  Document,
  ItemJobSection,
  JobSection,
} from "../../../types/Documents.type";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../service/Api";
import { KeyedMutator } from "swr";
import { handleExport } from "../../../utils/exportXlsx";
import { FaPlus } from "react-icons/fa";

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
  accessToken?: string;
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
  accessToken,
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

  const onSubmit = async (data: FormData) => {
    const percentage = data.percentage ? data.percentage.toString() : "0";
    try {
      setLoading(true);
      const api = new Api();
      api.url = `document/update/percentage/${dataDetail.slug}`;
      api.auth = true;
      api.token = accessToken ?? "";
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
    <div className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primaryBlue">
            Rincian
          </p>
          <h2 className="mt-2 text-lg font-bold text-gray-800">
            Rincian Pekerjaan
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola sektor, pekerjaan, dan rekapitulasi biaya.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleExport(dataDetail)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker"
        >
          <IoSave className="h-4 w-4" />
          Unduh Excel
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200/80">
        <table className="min-w-[980px] w-full text-center text-sm text-gray-700">
          <thead className="bg-primaryBlue text-xs uppercase tracking-wider text-white">
            <tr>
              <th scope="col" rowSpan={2} className="px-3 py-3 font-semibold">
                No
              </th>
              <th scope="col" rowSpan={2} className="px-3 py-3 font-semibold">
                Uraian Pekerjaan
              </th>
              <th scope="col" rowSpan={2} className="px-3 py-3 font-semibold">
                Volume
              </th>
              <th scope="col" colSpan={2} className="px-3 py-3 font-semibold">
                Harga Unit
              </th>
              <th scope="col" colSpan={2} className="px-3 py-3 font-semibold">
                Total Harga
              </th>
              <th scope="col" rowSpan={2} className="px-3 py-3 font-semibold">
                Informasi
              </th>
              <th scope="col" rowSpan={2} className="px-3 py-3 font-semibold">
                Aksi
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-3 py-2 font-semibold">
                Material
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Jasa
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Material
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Jasa
              </th>
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {dataDetail.jobSections.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                  Tidak ada bagian pekerjaan yang tersedia. Tambahkan bagian
                  pekerjaan untuk memulai.
                </td>
              </tr>
            ) : (
              dataDetail.jobSections.map(
                (jobSection: JobSection, index: number) => (
                  <React.Fragment key={jobSection.id}>
                    <tr className="bg-primaryBlue/10 border-b border-gray-200 font-semibold text-gray-800">
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
                      <td className="px-6 py-3 flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleUpdateSection(jobSection)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryGreen text-white shadow-sm transition duration-200 hover:bg-primaryGreenDarker disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <IoPencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSection(jobSection)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryRed text-white shadow-sm transition duration-200 hover:bg-primaryRedDarker disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <IoTrash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                    {jobSection.itemJobSections.length > 0 &&
                      jobSection.itemJobSections.map((item, index: number) => (
                        <tr
                          key={item.id}
                          className="odd:bg-white even:bg-gray-50 font-normal text-gray-700"
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
                          <td className="px-6 py-3 flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                handleUpdateItemJob(item, jobSection)
                              }
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryGreen text-white shadow-sm transition duration-200 hover:bg-primaryGreenDarker disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              <IoPencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItemJob(item)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryRed text-white shadow-sm transition duration-200 hover:bg-primaryRedDarker disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              <IoTrash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td></td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleCreateItemJob(jobSection)}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <FaPlus className="h-4 w-4" />
                          <span>Tambah Pekerjaan</span>
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
            <tr className="bg-primaryBlue/5 border-b border-gray-200 font-semibold text-gray-800">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3 text-center">
                <button
                  onClick={handleCreateSection}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <FaPlus className="h-4 w-4" />
                  <span>Tambah Sektor Pekerjaan</span>
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
            <tr className="bg-primaryBlue/10 border-b border-gray-200 font-semibold text-gray-800">
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
                  <tr className="bg-primaryBlue/10 border-b border-gray-200 font-semibold text-gray-800">
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
            <tr className="bg-primaryBlue/10 border-b border-gray-200 font-semibold text-gray-800">
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
            <tr className="bg-primaryBlue/10 border-b border-gray-200 font-semibold text-gray-800">
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
            <tr className="bg-primaryBlue/10 border-b border-gray-200 font-semibold text-gray-800">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">K&R (KEUNTUNGAN & RESIKO)</td>
              <td className="px-6 py-3">
                {!editMode ? (
                  `${dataDetail.percentageBenefitsAndRisks} %`
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
                    <input
                      readOnly={!editMode}
                      type="number"
                      min={0}
                      defaultValue={dataDetail.percentageBenefitsAndRisks}
                      className="w-16 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                      {...register("percentage")}
                    />
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
              <td className="px-6 py-3 flex items-center justify-center gap-2">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryGreen text-white shadow-sm transition duration-200 hover:bg-primaryGreenDarker disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <IoPencil className="h-4 w-4" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit(onSubmit)}
                      disabled={loading}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryBlue text-white shadow-sm transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <IoSave className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryRed text-white shadow-sm transition duration-200 hover:bg-primaryRedDarker disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <IoClose className="h-4 w-4" />
                    </button>
                  </>
                )}
              </td>
            </tr>
            <tr className="bg-primaryBlue/10 border-b border-gray-200 font-semibold text-gray-800">
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
