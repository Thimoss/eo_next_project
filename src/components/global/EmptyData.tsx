import React from "react";

export default function EmptyData() {
  return (
    <div className="relative flex-1 overflow-hidden rounded-3xl border border-gray-200/70 bg-white px-5 py-10 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.55)] sm:px-8 sm:py-12">
      <div className="pointer-events-none absolute -top-24 right-0 h-52 w-52 rounded-full bg-primaryBlue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-56 w-56 rounded-full bg-primaryGreen/10 blur-3xl" />
      <div className="pointer-events-none absolute right-6 top-10 h-16 w-16 rounded-full bg-primaryRed/10 blur-2xl" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-primaryBlue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primaryBlue">
            <span className="h-2 w-2 rounded-full bg-primaryBlue" />
            Data kosong
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800 sm:text-3xl">
            Belum ada data
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Silakan buat data baru terlebih dahulu agar daftar terisi. Tidak
            perlu menunggu.
          </p>
          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            Gunakan tombol tambah untuk membuat data pertama Anda.
          </p>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto flex w-full max-w-sm items-center justify-center md:justify-end">
            <div className="absolute -inset-6 rounded-[32px] bg-primaryBlue/10 blur-2xl" />
            <div className="relative rounded-[28px] bg-white p-4 shadow-[0_20px_46px_-34px_rgba(15,23,42,0.6)] ring-1 ring-gray-200/80">
              <svg
                viewBox="0 0 320 220"
                aria-hidden="true"
                className="h-40 w-60 sm:h-48 sm:w-72"
                fill="none"
              >
                <rect
                  x="24"
                  y="52"
                  width="210"
                  height="140"
                  rx="18"
                  fill="#F8FAFC"
                  stroke="#E2E8F0"
                  strokeWidth="2"
                />
                <rect
                  x="54"
                  y="82"
                  width="150"
                  height="12"
                  rx="6"
                  fill="#E2E8F0"
                />
                <rect
                  x="54"
                  y="108"
                  width="120"
                  height="12"
                  rx="6"
                  fill="#E2E8F0"
                />
                <rect
                  x="54"
                  y="134"
                  width="90"
                  height="12"
                  rx="6"
                  fill="#E2E8F0"
                />
                <rect
                  x="124"
                  y="24"
                  width="170"
                  height="120"
                  rx="18"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="2"
                />
                <rect
                  x="150"
                  y="54"
                  width="118"
                  height="12"
                  rx="6"
                  fill="#DBEAFE"
                />
                <rect
                  x="150"
                  y="80"
                  width="98"
                  height="12"
                  rx="6"
                  fill="#E2E8F0"
                />
                <circle cx="258" cy="64" r="20" fill="#DBEAFE" />
                <path
                  d="M258 54v20M248 64h20"
                  stroke="#006EB6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M60 28c16-16 46-22 70-10"
                  stroke="#D1E35B"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
