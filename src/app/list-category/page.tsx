"use client";
import Master from "@/components/global/Master";
import Pagination from "@/components/global/Pagination";
import CreateModal from "@/components/list-category/CreateModal";
import DeleteModal from "@/components/list-category/DeleteModal";
import Search from "@/components/list-category/Search";
import Table from "@/components/list-category/Table";
import UpdateModal from "@/components/list-category/UpdateModal";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

export interface CategoryProps {
  id: number;
  initial: string;
  name: string;
  code: string;
}

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
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>();

  const handleEdit = async (category: CategoryProps) => {
    setSelectedCategory(category);
    setOpenUpdate(true);
  };
  const handleDelete = async (category: CategoryProps) => {
    setSelectedCategory(category);
    setOpenDelete(true);
  };

  console.log(open);
  return (
    <Master>
      <div className="flex flex-col  gap-5">
        <h1 className="text-black font-bold">List Category</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
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
        <Table
          categories={categories}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination />
      </div>
      <CreateModal open={openCreate} setOpen={setOpenCreate} />
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        selectedCategory={selectedCategory}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        selectedCategory={selectedCategory}
      />
    </Master>
  );
}
