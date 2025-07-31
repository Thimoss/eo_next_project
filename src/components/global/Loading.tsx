import React from "react";
import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="bg-white flex-1 rounded-md p-4 flex flex-col gap-5">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 ">
          <CgSpinner className="w-full h-full animate-spin " />
        </div>
      </div>
    </div>
  );
}
