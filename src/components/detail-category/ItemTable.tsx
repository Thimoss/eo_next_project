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
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white">
      <table className="min-w-[760px] w-full text-center text-sm text-gray-700">
        <thead className="bg-primaryBlue text-xs uppercase tracking-wider text-white">
          <tr>
            <th scope="col" rowSpan={2} className="px-4 py-3 font-semibold">
              Sumber
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-3 font-semibold">
              No
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-3 font-semibold">
              Jenis Pekerjaan
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-3 font-semibold">
              Unit
            </th>
            <th scope="col" colSpan={2} className="px-4 py-2 font-semibold">
              Harga
            </th>
            <th scope="col" rowSpan={2} className="px-4 py-3 font-semibold">
              Aksi
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-2 font-semibold">
              Material
            </th>
            <th scope="col" className="px-4 py-2 font-semibold">
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
                    ? "odd:bg-white even:bg-gray-50"
                    : "bg-primaryBlue/10 text-gray-800 font-semibold"
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
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryBlue text-white shadow-sm transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <IoEye className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(item, selectedSector)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryGreen text-white shadow-sm transition duration-200 hover:bg-primaryGreenDarker disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <IoPencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryRed text-white shadow-sm transition duration-200 hover:bg-primaryRedDarker disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <IoTrash className="h-4 w-4" />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          <tr className="bg-gray-50 border-b border-gray-200">
            <td colSpan={7} className="px-4 py-2">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleCreate(selectedSector)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <FaPlus className="h-4 w-4" />
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
