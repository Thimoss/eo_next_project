import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";

interface FormData {
  job: string;
  location: string;
  base: string;
}

interface DocumentInfformationProps {
  job: string;
  location: string;
  base: string;
  slug: string;
  accessToken?: string;
  canEdit?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function DocumentInformation({
  job,
  location,
  base,
  slug,
  mutate,
  accessToken,
  canEdit = true,
}: DocumentInfformationProps) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm<FormData>({});

  useEffect(() => {
    if (editMode) {
      if (job || location || base) {
        reset({
          job: job,
          location: location,
          base: base,
        });
      }
    }
    if (job || location || base) {
      reset({
        job: job,
        location: location,
        base: base,
      });
    }
  }, [editMode, job, location, base, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `document/update/general-info/${slug}`;
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        job: data.job,
        location: data.location,
        base: data.base,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
        <div className="pointer-events-none absolute -top-16 right-0 h-36 w-36 rounded-full bg-primaryBlue/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-40 w-40 rounded-full bg-primaryGreen/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primaryBlue">
              Owner Estimate (OE)
            </p>
            <h2 className="mt-2 text-lg font-bold text-gray-800">
              Informasi Dokumen
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Ringkasan pekerjaan, lokasi, dan dasar dokumen.
            </p>
          </div>
          {canEdit && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {editMode ? (
                <>
                  <button
                    disabled={loading}
                    type="submit"
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
          )}
        </div>

        <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Pekerjaan
            </p>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                {...register("job")}
              />
            ) : (
              <p className="mt-3 text-sm font-semibold text-gray-800">
                {job || "-"}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Lokasi
            </p>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                {...register("location")}
              />
            ) : (
              <p className="mt-3 text-sm font-semibold text-gray-800">
                {location || "-"}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Dasar
            </p>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                {...register("base")}
              />
            ) : (
              <p className="mt-3 text-sm font-semibold text-gray-800">
                {base || "-"}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
