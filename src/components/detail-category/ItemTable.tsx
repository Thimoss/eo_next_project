import React from "react";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import { Item } from "../../../types/Items.type";
import { Sector } from "../../../types/Sectors.type";
import formatRupiah from "../../../utils/formatRupiah";
import { FaPlus } from "react-icons/fa";
import { DocumentUrl } from "../../../config/app";

interface ItemTableProps {
  data: Item[];
  openCreate: boolean;
  handleCreate: (sector: Sector) => Promise<void>;
  handleEdit: (item: Item, sector: Sector) => void;
  handleDelete: (item: Item) => Promise<void>;
  selectedSector: Sector;
}

export default function ItemTable({
  handleEdit,
  handleDelete,
  handleCreate,
  selectedSector,
  data,
}: ItemTableProps) {
  console.log(DocumentUrl);
  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table
        className="w-full text-center text-gray-700 font-medium text-sm "
        align="center"
      >
        <thead className="text-sm text-white uppercase bg-primaryBlue">
          <tr>
            <th scope="col" rowSpan={2} className="px-4 py-2">
              Sumber
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-2">
              No
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-2">
              Jenis Pekerjaan
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-2">
              Unit
            </th>
            <th scope="col" colSpan={2} className="px-4 py-1">
              Harga
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-2">
              Aksi
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-1">
              Material
            </th>
            <th scope="col" className="px-4 py-1">
              Jasa
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr
                key={item.id}
                className={`${
                  item.singleItem
                    ? "odd:bg-gray-100 even:bg-gray-50"
                    : "bg-blue-100"
                } border-b border-gray-200`}
              >
                <td className="px-4 py-2">{item.source ? item.source : "-"}</td>
                <td className="px-4 py-2">
                  {item.categoryCode}.{item.sectorNo}.{item.no}
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  {item.minimum} {item.unit}
                </td>
                <td className="px-4 py-2">
                  {formatRupiah(item.materialPricePerUnit)}
                </td>
                <td className="px-4 py-2">
                  {formatRupiah(item.feePricePerUnit)}
                </td>
                <td className="px-4 py-2 flex items-center gap-2 justify-center">
                  <button
                    onClick={async () => {
                      const response = await fetch(DocumentUrl + item.pdfUrl);
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);

                      const link = document.createElement("a");
                      link.href = url;
                      link.download = item.pdfUrl;
                      link.click();

                      window.URL.revokeObjectURL(url);
                    }}
                    className="text-white bg-primaryBlue disabled:bg-primaryBlueLighter hover:bg-primaryBlueDarker rounded-md px-2 py-1 transition duration-300 ease-in-out  cursor-pointer"
                  >
                    <div className="w-4 h-4">
                      <IoEye className="w-full h-full" />
                    </div>
                  </button>
                  <button
                    onClick={() => handleEdit(item, selectedSector)}
                    className="text-white bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker rounded-md px-2 py-1 transition duration-300 ease-in-out  cursor-pointer"
                  >
                    <div className="w-4 h-4">
                      <IoPencil className="w-full h-full" />
                    </div>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-white bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker rounded-md px-2 py-1 transition duration-300 ease-in-out  cursor-pointer"
                  >
                    <div className="w-4 h-4">
                      <IoTrash className="w-full h-full" />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
            <td colSpan={7} className="px-4 py-2">
              <div className="flex  justify-center">
                <button
                  onClick={() => handleCreate(selectedSector)}
                  className="text-white bg-primaryBlue disabled:bg-primaryBlueLighter hover:bg-primaryBlueDarker transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 justify-center rounded-md px-4 py-2 shadow-sm font-semibold"
                >
                  <div className="w-4 h-4">
                    <FaPlus className="w-full h-full" />
                  </div>
                  <span>Tambah Pekerjaan</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
