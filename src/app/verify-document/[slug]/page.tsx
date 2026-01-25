"use client";
import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Api from "../../../../service/Api";

interface DocumentVerificationData {
  name: string;
  slug: string;
  status: string;
  job: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    name: string;
    position: string;
  };
  checkedBy: {
    name: string;
    position: string;
  };
  checkedAt: string;
  confirmedBy: {
    name: string;
    position: string;
  };
  confirmedAt: string;
}

const fetcher = async (url: string) => {
  const api = new Api();
  api.url = url;
  api.auth = false;
  const response = await api.call();
  if (response.statusCode === 200) {
    return response.data;
  }
  throw new Error(response.message || "Failed to fetch document");
};

export default function VerifyDocumentPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, error, isLoading } = useSWR<DocumentVerificationData>(
    slug ? `document/verify/${slug}` : null,
    fetcher,
  );

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primaryBlue border-t-transparent"></div>
          <p className="text-gray-600">Memuat informasi dokumen...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="max-w-md rounded-2xl border border-red-200/70 bg-white p-8 text-center shadow-2xl">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Dokumen Tidak Ditemukan
          </h2>
          <p className="text-gray-600">
            {error?.message ||
              "Dokumen yang Anda cari tidak ditemukan atau belum disetujui."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primaryBlue to-primaryGreen shadow-lg">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Verifikasi Dokumen
          </h1>
          <p className="text-gray-600">
            Dokumen terverifikasi dan telah disetujui
          </p>
        </div>

        {/* Document Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-8 shadow-2xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primaryBlue/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primaryGreen/10 blur-3xl" />

          <div className="relative">
            {/* Document Title */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                ✓ Disetujui
              </span>
              <h2 className="mt-3 text-2xl font-bold text-gray-800">
                {data.name}
              </h2>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Pekerjaan:</span> {data.job}
                </div>
                <div>
                  <span className="font-semibold">Lokasi:</span> {data.location}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Riwayat Persetujuan
              </h3>
              <div className="space-y-4">
                {/* Created */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        className="h-5 w-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="h-12 w-0.5 bg-gray-200"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-gray-800">
                      Dibuat oleh
                    </p>
                    <p className="text-sm text-gray-600">
                      {data.createdBy.name} ({data.createdBy.position})
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(data.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Checked */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                      <svg
                        className="h-5 w-5 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="h-12 w-0.5 bg-gray-200"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-gray-800">
                      Diperiksa oleh
                    </p>
                    <p className="text-sm text-gray-600">
                      {data.checkedBy.name} ({data.checkedBy.position})
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(data.checkedAt)}
                    </p>
                  </div>
                </div>

                {/* Confirmed */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                      <svg
                        className="h-5 w-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Dikonfirmasi oleh
                    </p>
                    <p className="text-sm text-gray-600">
                      {data.confirmedBy.name} ({data.confirmedBy.position})
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(data.confirmedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Terakhir diperbarui: {formatDate(data.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Dokumen ini telah diverifikasi dan disetujui oleh pihak berwenang.
          </p>
          <p className="mt-1">
            Untuk informasi lebih lanjut, silakan hubungi administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
