import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";

export default function EmptyData() {
  return (
    <div className="bg-white flex-1 rounded-md p-4 flex flex-col gap-5">
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 ">
          <IoTrashBinOutline className="w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl font-bold">No data available</p>
        <p className="text-xs font-medium">Please check back later.</p>
      </div>
    </div>
  );
}
