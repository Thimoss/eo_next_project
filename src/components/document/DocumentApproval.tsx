import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

interface FormData {
  recapitulationLocation: string;
}

interface DocumentApprovalProps {
  recapitulationLocation: string;
  preparedByName: string;
  preparedByPosition: string;
  checkedByName: string;
  checkedByPosition: string;
  confirmedByName: string;
  confirmedByPosition: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  slug: string;
  accessToken?: string;
}

export default function DocumentApproval({
  recapitulationLocation,
  preparedByName,
  preparedByPosition,
  checkedByName,
  checkedByPosition,
  confirmedByName,
  confirmedByPosition,
  mutate,
  slug,
  accessToken,
}: DocumentApprovalProps) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {editMode ? (
            <>
              <button
                disabled={loading}
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <CgSpinner className="h-4 w-4 animate-spin" />}
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
                {preparedByPosition || "-"}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Nama
              </p>
              <p className="font-semibold text-gray-800">
                {preparedByName || "-"}
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
                {checkedByPosition || "-"}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Nama
              </p>
              <p className="font-semibold text-gray-800">
                {checkedByName || "-"}
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
                {confirmedByPosition || "-"}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Nama
              </p>
              <p className="font-semibold text-gray-800">
                {confirmedByName || "-"}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
