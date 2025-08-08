import React from "react";
import { Document } from "../../../types/Documents.type";
import { format } from "date-fns";

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="bg-white rounded-md p-4 flex flex-col gap-2">
      <div className="bg-gray-300 animate-pulse w-full aspect-video rounded-md"></div>
      <div className="flex flex-col gap-1">
        <span className="text-black font-semibold text-sm">
          {document.name}
        </span>
        <span className="text-xs text-gray-500">
          Last Modification : {format(document.updatedAt, "MM/dd/yyyy")}
        </span>
      </div>
      <div className="flex justify-end">
        <button className="bg-black rounded-md text-white p-1.5 px-3 hover:bg-gray-700 duration-300 cursor-pointer font-semibold text-xs">
          Open
        </button>
      </div>
    </div>
  );
}
