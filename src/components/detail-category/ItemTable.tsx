import React from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";

interface ItemTableProps {
  openCreateItem: boolean;
  setOpenCreateItem: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditItem: (item: any) => Promise<void>;
  handleDeleteItem: (item: any) => Promise<void>;
}

export default function ItemTable({
  openCreateItem,
  setOpenCreateItem,
  handleEditItem,
  handleDeleteItem,
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
            <th scope="col" colSpan={2} className="px-2 py-1.5">
              Price
            </th>
            <th scope="col" rowSpan={2} className="px-2 py-1.5">
              Action
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-2 py-1.5">
              Price 1
            </th>
            <th scope="col" className="px-2 py-1.5">
              Price 2
            </th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {/* Example row */}
          <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
            <td className="px-2 py-1.5">Source 1</td>
            <td className="px-2 py-1.5">1</td>
            <td className="px-2 py-1.5">Full-time</td>
            <td className="px-2 py-1.5">$5000</td>
            <td className="px-2 py-1.5">$5500</td>
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
                // onClick={() => handleDelete(category)}
                className="text-white bg-black rounded-md px-2 py-0.5 duration-300 hover:bg-gray-700 cursor-pointer"
              >
                <div className="w-4 h-4">
                  <IoTrash className="w-full h-full" />
                </div>
              </button>
            </td>
          </tr>
          {/* Example row */}
          <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
            <td className="px-2 py-1.5">Source 2</td>
            <td className="px-2 py-1.5">2</td>
            <td className="px-2 py-1.5">Part-time</td>
            <td className="px-2 py-1.5">$3000</td>
            <td className="px-2 py-1.5">$3500</td>{" "}
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
                // onClick={() => handleDelete(category)}
                className="text-white bg-black rounded-md px-2 py-0.5 duration-300 hover:bg-gray-700 cursor-pointer"
              >
                <div className="w-4 h-4">
                  <IoTrash className="w-full h-full" />
                </div>
              </button>
            </td>
          </tr>
          <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
            <td colSpan={7} className="px-2 py-1.5">
              <div className="flex  justify-center">
                <button
                  onClick={() => setOpenCreateItem(true)}
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
