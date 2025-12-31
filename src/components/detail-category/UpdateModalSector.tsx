import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { Sector } from "../../../types/Sectors.type";
import { IoCreateOutline } from "react-icons/io5";

interface FormData {
  name: string;
  no: string;
  source?: string;
}
interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  categoryId: string;
  selectedSector: Sector | null | undefined;
}

export default function UpdateModalSector({
  open,
  setOpen,
  mutate,
  categoryId,
  selectedSector,
}: UpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    // control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>({});

  useEffect(() => {
    // Reset form jika selectedCategory berubah
    if (selectedSector) {
      reset({
        name: selectedSector.name || "",
        no: selectedSector.no || "",
        source: selectedSector.source || "",
      });
    }
  }, [selectedSector, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `sector/update/${selectedSector?.id}`;
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        no: data.no,
        name: data.name,
        source: data.source,
        categoryId: Number(categoryId),
      };
      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setOpen(false);
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
      toast.error("Error updating sector: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
    clearErrors();
  };
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-primaryBlue via-primaryGreen to-primaryBlueLighter" />
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryBlue/10 text-primaryBlue">
              <IoCreateOutline className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Perbarui Sektor
              </h2>
              <p className="text-xs text-gray-500">
                Rapikan informasi sektor agar tetap akurat.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nama Sektor
                    </label>
                    <span className="text-sm font-semibold text-primaryRed">
                      *
                    </span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Input nama sektor"
                    {...register("name", { required: "Nama sektor diperlukan" })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="no"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nomor Sektor
                    </label>
                    <span className="text-sm font-semibold text-primaryRed">
                      *
                    </span>
                  </div>
                  <input
                    type="text"
                    id="no"
                    placeholder="Masukkan nomor sektor"
                    {...register("no", {
                      required: "Nomor sektor diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.no && (
                    <p className="text-sm text-red-500">
                      {errors.no.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label
                    htmlFor="source"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sumber
                  </label>
                  <input
                    type="text"
                    id="source"
                    placeholder="Masukkan sumber sektor"
                    {...register("source")}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.source && (
                    <p className="text-sm text-red-500">
                      {errors.source.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={handleCancel}
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <CgSpinner className="h-4 w-4 animate-spin" />}
                Perbarui
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
