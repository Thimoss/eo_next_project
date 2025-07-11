import { CategoryProps } from "@/app/list-category/page";
import React from "react";
import { IoPencil, IoTrash } from "react-icons/io5";

interface TableProps {
  categories: CategoryProps[];
  handleEdit: (category: CategoryProps) => Promise<void>;
  handleDelete: (category: CategoryProps) => Promise<void>;
}
export default function Table({
  categories,
  handleEdit,
  handleDelete,
}: TableProps) {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-center text-black text-xs" align="center">
        <thead className="text-xs text-black uppercase bg-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200"
            >
              <td className="px-6 py-3">{category.id}</td>
              <td className="px-6 py-3">{category.name}</td>
              <td className="px-6 py-3">{category.initial}</td>
              <td className="px-6 py-3 flex items-center gap-2 justify-center">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-white bg-black rounded-md px-2 py-0.5 duration-300 hover:bg-gray-700 cursor-pointer"
                >
                  <div className="w-4 h-4">
                    <IoPencil className="w-full h-full" />
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(category)}
                  className="text-white bg-black rounded-md px-2 py-0.5 duration-300 hover:bg-gray-700 cursor-pointer"
                >
                  <div className="w-4 h-4">
                    <IoTrash className="w-full h-full" />
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
