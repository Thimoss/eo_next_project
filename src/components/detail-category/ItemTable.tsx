import React from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import { Item } from "../../../types/Items.type";
import { Sector } from "../../../types/Sectors.type";

interface ItemTableProps {
  data: Item[];
  openCreate: boolean;
  // setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: (sector: Sector) => Promise<void>;
  handleEdit: () => Promise<void>;
  handleDeleteItem: (item: Item) => Promise<void>;
  selectedSector: Sector;
}

export default function ItemTable({
  // openCreate,
  // handleEdit,
  handleDelete,
  handleCreate,
  selectedSector,
  data,
}: ItemTableProps) {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-center text-black text-xs " align="center">
        <thead className="text-xs text-black uppercase bg-white">
          <tr>
            <th scope="col" rowSpan={2} className="px-2 py-1.5">
              Source
            </th>
            <th scope="col" rowSpan={2} className="px-2 py-1.5">
              No
            </th>
            <th scope="col" rowSpan={2} className="px-2 py-1.5">
              Job Types
            </th>
            <th scope="col" rowSpan={2} className="px-2 py-1.5">
              Unit
            </th>
            <th scope="col" colSpan={2} className="px-2 py-1.5">
              Price
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
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-2 py-1.5">
                  {item.source ? item.source : "-"}
                </td>
                <td className="px-2 py-1.5">
                  {item.categoryCode}.{item.sectorNo}.{item.no}
                </td>
                <td className="px-2 py-1.5">{item.name}</td>
                <td className="px-2 py-1.5">
                  {item.minimum} {item.unit}
                </td>
                <td className="px-2 py-1.5">{item.materialPricePerUnit}</td>
                <td className="px-2 py-1.5">{item.feePerUnit}</td>
                <td className="px-2 py-1.5 flex items-center gap-2 justify-center">
                  <button
                    // onClick={() => handleEdit(category)}
                    className="text-white bg-black rounded-md px-2 py-0.5 duration-300 hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="w-4 h-4">
                      <IoPencil className="w-full h-full" />
                    </div>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-white bg-black rounded-md px-2 py-0.5 duration-300 hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="w-4 h-4">
                      <IoTrash className="w-full h-full" />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
            <td colSpan={7} className="px-2 py-1.5">
              <div className="flex  justify-center">
                <button
                  onClick={() => handleCreate(selectedSector)}
                  className="text-white flex items-center gap-2 justify-center bg-black rounded-md px-2 py-0.5 duration-300 hover:bg-gray-700 cursor-pointer"
                >
                  <div className="w-4 h-4">
                    <IoAdd className="w-full h-full" />
                  </div>
                  <span>Tambah Item</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
