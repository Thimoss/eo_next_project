"use client";
import React from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { Category } from "../../../types/Categories.type";
import { useRouter } from "next/navigation";

interface TableProps {
  categories: Category[];
  handleEdit: (category: Category) => Promise<void>;
  handleDelete: (category: Category) => Promise<void>;
}
export default function Table({
  categories,
  handleEdit,
  handleDelete,
}: TableProps) {
  const route = useRouter();

  const handleDetail = async (category: Category) => {
    route.push(`detail-category/${category.id}`);
  };
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-center text-black text-xs" align="center">
        <thead className="text-xs text-white uppercase bg-primaryBlue">
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
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category.id}
              className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200"
            >
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">
                <span
                  onClick={() => handleDetail(category)}
                  className="hover:underline duration-300 cursor-pointer hover:text-primaryBlue"
                >
                  {category.name}
                </span>
              </td>
              <td className="px-6 py-3">{category.code}</td>
              <td className="px-6 py-3">{category.location}</td>
              <td className="px-6 py-3 flex items-center gap-2 justify-center">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-white bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
                >
                  <div className="w-4 h-4">
                    <IoPencil className="w-full h-full" />
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(category)}
                  className="text-white bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker rounded-md px-2 py-0.5 duration-300  cursor-pointer"
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
