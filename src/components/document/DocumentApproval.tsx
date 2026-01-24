/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import type { DocumentStatus } from "../../../types/Documents.type";
import type { UserSession } from "../../../types/Session.type";

interface FormData {
  recapitulationLocation: string;
}

interface DocumentApprovalProps {
  recapitulationLocation: string;
  preparedBy: any;
  checkedBy: any;
  confirmedBy: any;
  status: DocumentStatus;

  mutate: KeyedMutator<any>;
  slug: string;
  accessToken?: string;
  canEdit?: boolean;
  session?: UserSession | null;
}

const statusPalette: Record<
  DocumentStatus,
  { label: string; className: string }
> = {
  IN_PROGRESS: {
    label: "Dalam Proses",
    className: "bg-slate-100 text-slate-700",
  },
  NEED_CHECKED: {
    label: "Perlu Dicek",
    className: "bg-amber-100 text-amber-700",
  },
  NEED_CONFIRMED: {
    label: "Perlu Konfirmasi",
    className: "bg-sky-100 text-sky-700",
  },
  APPROVED: {
    label: "Disetujui",
    className: "bg-emerald-100 text-emerald-700",
  },
};

export default function DocumentApproval({
  recapitulationLocation,
  preparedBy,
  checkedBy,
  confirmedBy,
  status,
  mutate,
  slug,
  accessToken,
  canEdit = true,
  session,
}: DocumentApprovalProps) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approvalLoading, setApprovalLoading] = useState<
    "submit" | "check" | "confirm" | null
  >(null);
  const [currentDate, setCurrentDate] = useState("");
  const statusMeta = statusPalette[status];
  const sessionId = session?.id;
  const ownerId = preparedBy?.id;
  const checkerId = checkedBy?.id;
  const confirmerId = confirmedBy?.id;
  const isOwner = Boolean(sessionId && ownerId && sessionId === ownerId);
  const isChecker = Boolean(sessionId && checkerId && sessionId === checkerId);
  const isConfirmer = Boolean(
    sessionId && confirmerId && sessionId === confirmerId
  );

  const actionConfig =
    status === "IN_PROGRESS" && isOwner
      ? {
          key: "submit" as const,
          label: "Kirim untuk Dicek",
          className:
            "bg-primaryBlue shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] hover:bg-primaryBlueDarker",
        }
      : status === "NEED_CHECKED" && isChecker
      ? {
          key: "check" as const,
          label: "Setujui (Checker)",
          className:
            "bg-primaryGreen shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] hover:bg-primaryGreenDarker",
        }
      : status === "NEED_CONFIRMED" && isConfirmer
      ? {
          key: "confirm" as const,
          label: "Konfirmasi",
          className:
            "bg-primaryGreen shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] hover:bg-primaryGreenDarker",
        }
      : null;

  const { handleSubmit, register, reset } = useForm<FormData>({});
  useEffect(() => {
    reset({
      recapitulationLocation: recapitulationLocation ?? "",
    });
  }, [recapitulationLocation, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const shouldUpdateRecapitulation =
        data.recapitulationLocation !== recapitulationLocation;

      if (!shouldUpdateRecapitulation) {
        toast.error("Tidak ada perubahan untuk disimpan.");
        return;
      }

      const api = new Api();
      api.url = `document/update/recapitulation-location/${slug}`;
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        recapitulationLocation: data.recapitulationLocation,
      };

      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setEditMode(false);
        mutate();
        reset({
          recapitulationLocation: data.recapitulationLocation ?? "",
        });
      } else {
        if (response.message && Array.isArray(response.message)) {
          response.message.forEach((error: string) => {
            toast.error(error);
          });
        } else {
          toast.error(response.message);
        }
      }
    } catch (error: any) {
      toast.error("Error updating document: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    reset({
      recapitulationLocation: recapitulationLocation ?? "",
    });
  };

  const handleApprovalAction = async (
    action: "submit" | "check" | "confirm"
  ) => {
    const actionMap = {
      submit: {
        url: `document/submit/${slug}`,
        success: "Dokumen berhasil dikirim untuk dicek.",
      },
      check: {
        url: `document/approve/check/${slug}`,
        success: "Dokumen berhasil disetujui oleh checker.",
      },
      confirm: {
        url: `document/approve/confirm/${slug}`,
        success: "Dokumen berhasil dikonfirmasi.",
      },
    } as const;

    try {
      setApprovalLoading(action);
      const api = new Api();
      api.url = actionMap[action].url;
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "PATCH";
      api.type = "json";
      api.body = {};

      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(actionMap[action].success);
        mutate();
        return;
      }

      if (response.message && Array.isArray(response.message)) {
        response.message.forEach((error: string) => {
          toast.error(error);
        });
      } else {
        toast.error(response.message ?? "Gagal memperbarui status dokumen.");
      }
    } catch (error: any) {
      toast.error("Error updating document status: " + error.message);
    } finally {
      setApprovalLoading(null);
    }
  };

  useEffect(() => {
    const today = new Date();

    // Format tanggal dalam bentuk dd MMMM yyyy
    const formattedDate = `${today.getDate()} ${today.toLocaleString("id-ID", {
      month: "long",
    })} ${today.getFullYear()}`;

    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
      <div className="pointer-events-none absolute -top-16 right-0 h-36 w-36 rounded-full bg-primaryBlue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-40 w-40 rounded-full bg-primaryGreen/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primaryBlue">
            Persetujuan
          </p>
          <h2 className="mt-2 text-lg font-bold text-gray-800">
            Persetujuan Dokumen
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Informasi penanggung jawab dokumen.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusMeta.className}`}
          >
            Status: {statusMeta.label}
          </span>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {actionConfig && (
              <button
                type="button"
                onClick={() => handleApprovalAction(actionConfig.key)}
                disabled={approvalLoading !== null}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${actionConfig.className}`}
              >
                {approvalLoading === actionConfig.key && (
                  <CgSpinner className="h-4 w-4 animate-spin" />
                )}
                {actionConfig.label}
              </button>
            )}
            {canEdit && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {editMode ? (
                  <>
                    <button
                      disabled={loading}
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading && (
                        <CgSpinner className="h-4 w-4 animate-spin" />
                      )}
                      Simpan
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleCancel}
                      className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="inline-flex items-center justify-center rounded-full bg-primaryGreen px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] transition duration-200 hover:bg-primaryGreenDarker"
                  >
                    Perbarui Lokasi
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative mt-6">
        <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Lokasi
            </span>
            <input
              readOnly={!editMode}
              type="text"
              className={`w-full sm:w-48 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${
                editMode
                  ? "border border-gray-200 bg-white focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/30"
                  : "border border-transparent bg-transparent"
              }`}
              {...register("recapitulationLocation")}
              placeholder="Masukkan lokasi"
            />
          </div>
          <span className="hidden text-gray-300 sm:inline">|</span>
          <span className="text-sm text-gray-500">{currentDate}</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Disiapkan oleh
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Jabatan
              </p>
              <p className="font-medium text-gray-800">
                {preparedBy?.position || "-"}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Nama
              </p>
              <p className="font-semibold text-gray-800">
                {preparedBy?.name || "-"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Diperiksa oleh
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Jabatan
              </p>
              <p className="font-medium text-gray-800">
                {checkedBy?.position || "-"}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Nama
              </p>
              <p className="font-semibold text-gray-800">
                {checkedBy?.name || "-"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Disahkan oleh
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Jabatan
              </p>
              <p className="font-medium text-gray-800">
                {confirmedBy?.position || "-"}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Nama
              </p>
              <p className="font-semibold text-gray-800">
                {confirmedBy?.name || "-"}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
