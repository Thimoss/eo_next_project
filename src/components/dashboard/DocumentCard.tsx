import React, { useEffect, useRef, useState } from "react";
import { Document } from "../../../types/Documents.type";
import { format } from "date-fns";
import { HiDotsVertical } from "react-icons/hi";

interface DocumentCardProps {
  document: Document;
  handleDetail: (document: Document) => Promise<void>;
  handleEdit?: (document: Document) => Promise<void>;
  handleDelete?: (document: Document) => Promise<void>;
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
  const hasActions = Boolean(handleEdit || handleDelete);

  const toggleActions = () => {
    if (!hasActions) {
      return;
    }
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
    <div className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_60px_-36px_rgba(15,23,42,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primaryBlue/5 via-transparent to-primaryGreen/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primaryBlue via-primaryBlueDarker to-primaryBlueDarker aspect-video">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_55%)]" />
        <span className="relative text-2xl font-bold uppercase tracking-[0.2em] text-white drop-shadow-sm">
          {initials}
        </span>

        {hasActions && (
          <div className="absolute right-2 top-2">
            <div className="relative h-full">
              <button
                type="button"
                onClick={toggleActions}
                aria-label="Menu dokumen"
                aria-expanded={showActions}
                className="flex cursor-pointer items-center justify-center rounded-full bg-white/15 p-2 text-white transition duration-200 ease-in-out hover:bg-white hover:text-primaryBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <HiDotsVertical className="w-full h-full" />
              </button>
              {showActions && (
                <div
                  ref={actionsRef}
                  className="absolute right-0 z-10 mt-2 flex w-28 flex-col gap-1 rounded-xl border border-gray-100 bg-white p-1.5 text-sm shadow-[0_16px_40px_-28px_rgba(15,23,42,0.5)]"
                >
                  {handleEdit && (
                    <button
                      type="button"
                      onClick={() => handleEdit(document)}
                      className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                  )}
                  {handleDelete && (
                    <button
                      type="button"
                      onClick={() => handleDelete(document)}
                      className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-primaryRed transition duration-200 hover:bg-gray-100"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col justify-between gap-3">
        {/* Document's info */}
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-800">
            {document.name}
          </span>
          <span className="text-xs text-gray-500">
            Modifikasi Terakhir : {format(document.updatedAt, "MM/dd/yyyy")}
          </span>
        </div>
        <div className="flex justify-end">
          {/* Open Button */}
          <button
            type="button"
            onClick={() => handleDetail(document)}
            className="inline-flex items-center justify-center rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.85)] transition duration-200 ease-in-out hover:bg-primaryBlueDarker cursor-pointer"
          >
            <span className="text-sm font-semibold">Buka</span>
          </button>
        </div>
      </div>
    </div>
  );
}
