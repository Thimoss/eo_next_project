import React from "react";

export default function SectorEmpty() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-6 text-center text-sm font-semibold text-gray-700 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
      <div className="pointer-events-none absolute -top-10 right-0 h-24 w-24 rounded-full bg-primaryBlue/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 left-0 h-28 w-28 rounded-full bg-primaryGreen/10 blur-2xl" />
      <p className="relative">Belum ada sektor tersedia.</p>
      <p className="relative mt-2 text-xs text-gray-500">
        Tambahkan sektor baru untuk memulai.
      </p>
    </div>
  );
}
