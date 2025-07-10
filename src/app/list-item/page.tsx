import Search from "@/components/dashboard/Search";
import Master from "@/components/global/Master";
import Pagination from "@/components/global/Pagination";
import Table from "@/components/list-item/Table";
import React from "react";
import { IoAdd } from "react-icons/io5";

export default function ListItem() {
  return (
    <Master>
      <div className="flex flex-col  gap-5">
        <h1 className="text-black font-bold">List Item</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 ">
          <Search />

          <div className="flex justify-end w-full">
            <button
              //    onClick={() => setOpenCreate(true)}
              className="flex items-center gap-2 text-white bg-black hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
            >
              <div className="w-4 h-4">
                <IoAdd className="w-full h-full" />
              </div>
              <span className="text-xs font-semibold">Add</span>
            </button>
          </div>
        </div>

        <Table />
        <Pagination />
      </div>
    </Master>
  );
}
