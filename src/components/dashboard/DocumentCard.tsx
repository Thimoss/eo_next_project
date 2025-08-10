import React from "react";
import { Document } from "../../../types/Documents.type";
import { format } from "date-fns";

interface DocumentCardProps {
  document: Document;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDetail: (document: any) => Promise<void>;
}

export default function DocumentCard({
  document,
  handleDetail,
}: DocumentCardProps) {
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
        <button
          onClick={() => handleDetail(document)}
          className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
        >
          Open
        </button>
      </div>
    </div>
  );
}
