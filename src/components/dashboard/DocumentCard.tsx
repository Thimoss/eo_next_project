import React from "react";

interface DocumentCardProps {
  item: number;
}

export default function DocumentCard({ item }: DocumentCardProps) {
  return (
    <div className="bg-white rounded-md drop-shadow-md p-4 flex flex-col gap-2">
      <div className="bg-gray-300 animate-pulse w-full aspect-video rounded-md"></div>
      <div className="flex flex-col gap-1">
        <span className="text-black font-semibold text-sm">
          Document {item}
        </span>
        <span className="text-xs text-gray-500">
          Last Modification : 1/1/1010
        </span>
      </div>
      <div className="flex justify-end">
        <button className="bg-black rounded-md text-white p-1.5 px-3 hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs">
          Open
        </button>
      </div>
    </div>
  );
}
