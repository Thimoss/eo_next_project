import React, { useEffect, useRef, useState } from "react";
import { Document } from "../../../types/Documents.type";
import { format } from "date-fns";
import { HiDotsVertical } from "react-icons/hi";

interface DocumentCardProps {
  document: Document;
  handleDetail: (document: Document) => Promise<void>;
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
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const toggleActions = () => {
    setShowActions((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };

    globalThis.document.addEventListener("mousedown", handleClickOutside);

    return () => {
      globalThis.document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-md p-4 flex flex-col gap-2">
      <div className="bg-primaryBlue flex items-center justify-center w-full aspect-video rounded-md relative">
        {/* Thumbnail Text */}
        <span className="text-xl text-white font-bold">{initials}</span>

        {/* Actions Button */}
        <div className="absolute top-1 right-1">
          <div className="relative h-full">
            <button
              onClick={toggleActions}
              className="p-2 text-white font-bold rounded-md hover:bg-white hover:text-primaryBlue transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2"
            >
              <HiDotsVertical className="w-full h-full" />
            </button>
            {showActions && (
              <div
                ref={actionsRef}
                className={`bg-white shadow-sm rounded-md p-2 absolute right-0  translate-y-full -bottom-1 w-24 h-22 justify-between flex flex-col transition-all duration-300 ease-in-out ${
                  showActions
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                <div
                  onClick={() => handleEdit(document)}
                  className="px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 duration-300 font-semibold cursor-pointer"
                >
                  Edit
                </div>
                <div
                  onClick={() => handleDelete(document)}
                  className="px-4 py-2 text-sm  rounded-md hover:bg-gray-200 duration-300 text-primaryRed font-semibold cursor-pointer"
                >
                  Hapus
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-between h-full">
        {/* Document's info */}
        <div className="flex flex-col gap-1.5">
          <span className="text-gray-700 font-semibold text-sm">
            {document.name}
          </span>
          <span className="text-xs text-gray-600">
            Modifikasi Terakhir : {format(document.updatedAt, "MM/dd/yyyy")}
          </span>
        </div>
        <div className="flex justify-end">
          {/* Open Button */}
          <button
            onClick={() => handleDetail(document)}
            className="px-4 py-2 bg-primaryBlue text-white font-bold rounded-md hover:bg-primaryBlueDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2"
          >
            <span className="text-sm font-semibold">Buka</span>
          </button>
        </div>
      </div>
    </div>
  );
}
