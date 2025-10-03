import React, { useState } from "react";
import { Document } from "../../../types/Documents.type";
import { format } from "date-fns";
import { HiDotsVertical } from "react-icons/hi";

interface DocumentCardProps {
  document: Document;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDetail: (document: any) => Promise<void>;
  handleEdit: (document: Document) => Promise<void>;
  handleDelete: (document: Document) => Promise<void>;
}

const getInitials = (name: string) => {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials.slice(0, 3); // Return the first two initials
};

export default function DocumentCard({
  document,
  handleDetail,
  handleEdit,
  handleDelete,
}: DocumentCardProps) {
  const initials = getInitials(document.name);
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => {
    setShowActions((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-md p-4 flex flex-col gap-2">
      {/* Buat Thumbnail Dari Nama Dokumen */}
      <div className="flex justify-end">
        <div className="relative">
          <button
            onClick={toggleActions}
            className="h-6 w-6 rounded-md hover:bg-gray-200 duration-300 flex items-center justify-center p-1"
          >
            <HiDotsVertical />
          </button>
          {showActions && (
            <div
              className={`bg-white drop-shadow-md rounded-md p-2 absolute right-0 bottom-0 translate-y-full w-20 h-22 justify-between flex flex-col transition-all duration-300 ease-in-out ${
                showActions
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <div
                onClick={() => handleEdit(document)}
                className="p-2 text-xs rounded-md hover:bg-gray-200 duration-300 font-medium cursor-pointer"
              >
                Edit
              </div>
              <div
                onClick={() => handleDelete(document)}
                className="p-2 text-xs rounded-md hover:bg-gray-200 duration-300 text-primaryRed font-medium cursor-pointer"
              >
                Hapus
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-primaryBlue flex items-center justify-center w-full aspect-video rounded-md">
        <span className="text-xl text-white font-bold">{initials}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-black font-semibold text-sm">
          {document.name}
        </span>
        <span className="text-xs text-gray-500">
          Modifikasi Terakhir : {format(document.updatedAt, "MM/dd/yyyy")}
        </span>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => handleDetail(document)}
          className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
        >
          Buka
        </button>
      </div>
    </div>
  );
}
