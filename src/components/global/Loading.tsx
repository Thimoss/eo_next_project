import React from "react";
import { ImSpinner10 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="bg-white flex-1 rounded-md p-4 flex flex-col gap-5">
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 ">
          <ImSpinner10 className="w-full h-full animate-spin " />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl font-bold">No data available</p>
        <p className="text-xs font-medium">Please check back later.</p>
      </div>
    </div>
  );
}
