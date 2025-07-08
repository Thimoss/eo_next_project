"use client";
import Master from "@/components/global/Master";
import Pagination from "@/components/global/Pagination";
import CreateModal from "@/components/list-category/CreateModal";
import Search from "@/components/list-category/Search";
import UpdateModal from "@/components/list-category/UpdateModal";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

const categories = [
  { id: 1, initial: "A", name: "Kategori A", code: "A001" },
  { id: 2, initial: "B", name: "Kategori B", code: "B002" },
  { id: 3, initial: "C", name: "Kategori C", code: "C003" },
  { id: 4, initial: "D", name: "Kategori D", code: "D004" },
  { id: 5, initial: "E", name: "Kategori E", code: "E005" },
];

export default function ListCategory() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  console.log(open);
  return (
    <Master>
      <div className="flex flex-col gap-5">
        <h1 className="text-black font-bold">List Category</h1>
        <div className="flex flex-col items-center justify-between gap-5 ">
          <Search />

          <div className="flex justify-end w-full">
            <button
              onClick={() => setOpenCreate(true)}
              className="flex items-center gap-2 text-white bg-black hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
            >
              <div className="w-4 h-4">
                <IoAdd className="w-full h-full" />
              </div>
              <span className="text-xs font-semibold">Add</span>
            </button>
          </div>
        </div>

        {/* Table */}
        {/* No, Nama Kategori, Kode */}
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table
            className="w-full text-center text-black text-xs"
            align="center"
          >
            <thead className="text-xs text-black uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
      <CreateModal open={openCreate} setOpen={setOpenCreate} />
      <UpdateModal open={openUpdate} setOpen={setOpenUpdate} />
    </Master>
  );
}
