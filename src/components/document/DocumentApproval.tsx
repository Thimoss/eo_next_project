import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

interface FormData {
  recapitulationLocation: string;
  preparedByName: string;
  preparedByPosition: string;
  checkedByName: string;
  checkedByPosition: string;
  confirmedByName: string;
  confirmedByPosition: string;
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
    if (editMode) {
      if (
        recapitulationLocation ||
        preparedByName ||
        preparedByPosition ||
        checkedByName ||
        checkedByPosition ||
        confirmedByName ||
        confirmedByPosition
      ) {
        reset({
          recapitulationLocation: recapitulationLocation,
          preparedByName: preparedByName,
          preparedByPosition: preparedByPosition,
          checkedByName: checkedByName,
          checkedByPosition: checkedByPosition,
          confirmedByName: confirmedByName,
          confirmedByPosition: confirmedByPosition,
        });
      }
    }
    if (
      recapitulationLocation ||
      preparedByName ||
      preparedByPosition ||
      checkedByName ||
      checkedByPosition ||
      confirmedByName ||
      confirmedByPosition
    ) {
      reset({
        recapitulationLocation: recapitulationLocation,
        preparedByName: preparedByName,
        preparedByPosition: preparedByPosition,
        checkedByName: checkedByName,
        checkedByPosition: checkedByPosition,
        confirmedByName: confirmedByName,
        confirmedByPosition: confirmedByPosition,
      });
    }
  }, [
    checkedByName,
    checkedByPosition,
    confirmedByName,
    confirmedByPosition,
    editMode,
    preparedByName,
    preparedByPosition,
    recapitulationLocation,
    reset,
  ]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `document/update/approval/${slug}`;
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        recapitulationLocation: data.recapitulationLocation,
        preparedByName: data.preparedByName,
        preparedByPosition: data.preparedByPosition,
        checkedByName: data.checkedByName,
        checkedByPosition: data.checkedByPosition,
        confirmedByName: data.confirmedByName,
        confirmedByPosition: data.confirmedByPosition,
      };
      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setEditMode(false);
        mutate();
        reset();
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
    reset();
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
            Lengkapi informasi penanggung jawab dokumen.
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
              Perbarui
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
            <div className="mt-4 space-y-3">
              <input
                readOnly={!editMode}
                type="text"
                className={`w-full rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${
                  editMode
                    ? "border border-gray-200 bg-white focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/30"
                    : "border border-transparent bg-transparent"
                }`}
                {...register("preparedByPosition")}
                placeholder="Jabatan"
              />
              <input
                readOnly={!editMode}
                type="text"
                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none ${
                  editMode
                    ? "border border-gray-200 bg-white focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/30"
                    : "border border-transparent bg-transparent"
                }`}
                {...register("preparedByName")}
                placeholder="Nama"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Diperiksa oleh
            </p>
            <div className="mt-4 space-y-3">
              <input
                readOnly={!editMode}
                type="text"
                className={`w-full rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${
                  editMode
                    ? "border border-gray-200 bg-white focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/30"
                    : "border border-transparent bg-transparent"
                }`}
                {...register("checkedByPosition")}
                placeholder="Jabatan"
              />
              <input
                readOnly={!editMode}
                type="text"
                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none ${
                  editMode
                    ? "border border-gray-200 bg-white focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/30"
                    : "border border-transparent bg-transparent"
                }`}
                {...register("checkedByName")}
                placeholder="Nama"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Disahkan oleh
            </p>
            <div className="mt-4 space-y-3">
              <input
                readOnly={!editMode}
                type="text"
                className={`w-full rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${
                  editMode
                    ? "border border-gray-200 bg-white focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/30"
                    : "border border-transparent bg-transparent"
                }`}
                {...register("confirmedByPosition")}
                placeholder="Jabatan"
              />
              <input
                readOnly={!editMode}
                type="text"
                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none ${
                  editMode
                    ? "border border-gray-200 bg-white focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/30"
                    : "border border-transparent bg-transparent"
                }`}
                {...register("confirmedByName")}
                placeholder="Nama"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
