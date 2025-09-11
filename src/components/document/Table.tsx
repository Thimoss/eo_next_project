import React from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import formatRupiah from "../../../utils/formatRupiah";
import {
  Document,
  ItemJobSection,
  JobSection,
} from "../../../types/Documents.type";

interface TableProps {
  handleCreateSection: () => Promise<void>;
  handleUpdateSection: (section: JobSection) => Promise<void>;
  handleDeleteSection: (section: JobSection) => Promise<void>;
  handleCreateItemJob: (section: JobSection) => Promise<void>;
  handleUpdateItemJob: (
    item: ItemJobSection,
    section: JobSection
  ) => Promise<void>;
  dataDetail: Document;
}

export default function Table({
  handleCreateSection,
  handleUpdateSection,
  handleDeleteSection,
  handleCreateItemJob,
  handleUpdateItemJob,
  dataDetail,
}: TableProps) {
  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-center text-black text-xs" align="center">
          <thead className="text-xs text-white uppercase bg-primaryBlue">
            <tr>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                No
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Job Description
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Volume
              </th>
              <th scope="col" colSpan={2} className="px-2 py-1.5">
                Unit Price
              </th>
              <th scope="col" colSpan={2} className="px-2 py-1.5">
                Total Price
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Information
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Action
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-2 py-1.5">
                Material
              </th>
              <th scope="col" className="px-2 py-1.5">
                Fee
              </th>
              <th scope="col" className="px-2 py-1.5">
                Material
              </th>
              <th scope="col" className="px-2 py-1.5">
                Fee
              </th>
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {dataDetail.jobSections.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-3">
                  No job sections available. Add a job section to start.
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
                              onClick={() => handleDeleteSection(jobSection)}
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
                            Add Item
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
                  <span className="text-xs font-semibold">Add Job Section</span>
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
              <td className="px-6 py-3">TOTAL MATERIAL / FEE</td>
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
              <td className="px-6 py-3">TOTAL MATERIAL + FEE</td>
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
            <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">PEMBULATAN</td>
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
              <td className="px-6 py-3">K&R (KEUNTUNGAN & RISIKO)</td>
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
            </tr>
            <tr className="bg-blue-200 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">TOTAL MATERIAL + JASA + K&R</td>
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
              <td className="px-6 py-3">TERBILANG</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
// const handleExportExcel = () => {
//   const sheetData = [];

//   // Header tabel dengan 2 sub-kolom di bawah Harga Satuan dan Jumlah Harga
//   const headers = [
//     "No",
//     "Uraian Pekerjaan",
//     "Volume",
//     "Harga Satuan",
//     "Jumlah Harga",
//   ];

//   // Menambahkan baris pertama (header) ke dalam sheetData
//   sheetData.push(headers);

//   // Data untuk job sections dan items
//   dataDetail.jobSections.forEach((jobSection, index) => {
//     // Menambahkan data job section
//     const row = [
//       String.fromCharCode(65 + index),
//       jobSection.name,
//       "", // Volume
//       "", // Harga Satuan (Material)
//       "", // Harga Satuan (Jasa)
//       formatRupiah(jobSection.totalMaterialPrice),
//       formatRupiah(jobSection.totalFeePrice),
//       "", // Information
//     ];
//     sheetData.push(row);

//     // Menambahkan data item di dalam job section
//     jobSection.itemJobSections.forEach((item: Item | MaterialItem) => {
//       const itemRow = [
//         "", // No (biarkan kosong karena sudah ada pada job section)
//         item.name,
//         item.volume,
//         formatRupiah(item.materialPricePerUnit), // Harga Satuan (Material)
//         formatRupiah(item.feePricePerUnit), // Harga Satuan (Jasa)
//         formatRupiah(item.totalMaterialPrice), // Jumlah Harga (Material)
//         formatRupiah(item.totalFeePrice), // Jumlah Harga (Jasa)
//         item.information,
//       ];
//       sheetData.push(itemRow);
//     });
//   });

//   // Membuat worksheet dari data
//   const ws = XLSX.utils.aoa_to_sheet(sheetData);

//   // Menyusun pengaturan kolom dan lebar
//   ws["!cols"] = [
//     { wch: 5 }, // Kolom No
//     { wch: 30 }, // Kolom Uraian Pekerjaan
//     { wch: 10 }, // Kolom Volume
//     { wch: 15 }, // Kolom Harga Satuan (Material)
//     { wch: 15 }, // Kolom Harga Satuan (Jasa)
//     { wch: 20 }, // Kolom Jumlah Harga (Material)
//     { wch: 20 }, // Kolom Jumlah Harga (Jasa)
//     { wch: 25 }, // Kolom Information
//   ];

//   // Menambahkan merge cell untuk header agar sub-kolom Material dan Jasa berada di bawah Harga Satuan dan Jumlah Harga
//   ws["!merges"] = [
//     { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } }, // Menggabungkan Harga Satuan (Material) dan (Jasa)
//     { s: { r: 0, c: 5 }, e: { r: 0, c: 6 } }, // Menggabungkan Jumlah Harga (Material) dan (Jasa)
//   ];

//   // Menambahkan styling untuk header
//   const headerStyle = {
//     font: { bold: true },
//     alignment: { horizontal: "center" },
//   };
//   for (let col = 0; col < headers.length; col++) {
//     ws[XLSX.utils.encode_cell({ r: 0, c: col })].s = headerStyle; // Styling header
//   }

//   // Membuat workbook dan menambah sheet
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Job Sections");

//   // Menyimpan file Excel
//   XLSX.writeFile(wb, "Job_Sections.xlsx");
// };

{
  /* <div className="flex justify-center mt-4">
          <button
            onClick={handleExportExcel}
            className="text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
          >
            Export to Excel
          </button>
        </div> */
}
