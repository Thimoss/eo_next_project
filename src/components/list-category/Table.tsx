"use client";
import React from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { Category } from "../../../types/Categories.type";
import { useRouter } from "nextjs-toploader/app";

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
    <div className="rounded-2xl border border-gray-200/70 bg-white p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-6">
      <div className="overflow-x-auto rounded-2xl border border-gray-200/80">
        <table className="min-w-[720px] w-full text-center text-sm text-gray-700">
          <thead className="bg-primaryBlue text-xs uppercase tracking-wider text-white">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              No
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Nama Kategori
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Kode
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Lokasi
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Aksi
            </th>
          </tr>
        </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200 text-gray-700"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleDetail(category)}
                    className="font-semibold text-primaryBlue transition duration-200 hover:underline"
                  >
                    {category.name}
                  </button>
                </td>
                <td className="px-4 py-3">{category.code}</td>
                <td className="px-4 py-3">{category.location}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryGreen text-white shadow-sm transition duration-200 hover:bg-primaryGreenDarker disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <IoPencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryRed text-white shadow-sm transition duration-200 hover:bg-primaryRedDarker disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <IoTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
