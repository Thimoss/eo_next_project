import React from "react";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

export default function SortBy() {
  return (
    <div className="relative w-full max-w-[12rem]">
      <div className="bg-white rounded-md px-3 py-1.5 flex items-center gap-2 justify-between">
        <span className="text-xs">Sort By: Last Mofified</span>
        <div className="w-4 h-4">
          <IoChevronDown className="w-full h-full" />
        </div>
      </div>
      <div className="bg-white rounded-md p-4 absolute z-10 translate-y-full -bottom-1 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs justify-between hover:bg-gray-300 duration-300 p-1.5 rounded-md">
          <span>Alphabetical (A–Z)</span>
          <div className="w-4 h-4">
            <IoCheckmark className="w-full h-full" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs justify-between hover:bg-gray-300 duration-300 p-1.5 rounded-md">
          <span>Alphabetical (Z–A)</span>
          <div className="w-4 h-4">
            <IoCheckmark className="w-full h-full" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs justify-between hover:bg-gray-300 duration-300 p-1.5 rounded-md">
          <span className="">Most Recently Updated</span>
          <div className="w-4 h-4">
            <IoCheckmark className="w-full h-full" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs justify-between hover:bg-gray-300 duration-300 p-1.5 rounded-md">
          <span className="">Least Recently Updated</span>
          <div className="w-4 h-4">
            <IoCheckmark className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
