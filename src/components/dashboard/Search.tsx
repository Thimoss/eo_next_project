import React from "react";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div
      className="flex items-center gap-5 w-full max-w-xs 
          "
    >
      <input
        type="text"
        placeholder="Search Document..."
        className="focus:outline-none text-xs w-full bg-white py-1.5 px-3 rounded-md  h-full"
      />

      <button className="flex items-center gap-2 text-white bg-black hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md">
        <div className="w-4 h-4">
          <IoSearch className="w-full h-full" />
        </div>
        <span className="text-xs font-semibold">Search</span>
      </button>
    </div>
  );
}
