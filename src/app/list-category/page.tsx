import Master from "@/components/global/Master";
import Search from "@/components/list-category/Search";
import React from "react";
import { IoAdd } from "react-icons/io5";

export default function ListCategory() {
  return (
    <Master>
      <div>
        <h1 className="text-black font-bold">List Category</h1>
        <div className="flex items-center justify-between ">
          <Search />
          <div>
            <button className="flex items-center gap-2 text-white bg-black hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md">
              <div className="w-4 h-4">
                <IoAdd className="w-full h-full" />
              </div>
              <span className="text-xs font-semibold">Add</span>
            </button>
          </div>
        </div>
        
        <div>page</div>
      </div>
    </Master>
  );
}
