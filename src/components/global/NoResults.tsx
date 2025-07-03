import React from "react";
import { IoSearch } from "react-icons/io5";

export default function NoResults() {
  return (
    <div className="bg-white flex-1 rounded-md p-4 flex flex-col gap-5">
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 ">
          <IoSearch className="w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl font-bold">No results found</p>
        <p className="text-xs font-medium">Try searching again.</p>
      </div>
    </div>
  );
}
