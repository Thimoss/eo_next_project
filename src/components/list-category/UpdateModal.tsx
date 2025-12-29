import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { Category } from "../../../types/Categories.type";
import { KeyedMutator } from "swr";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../service/Api";
import { CgSpinner } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";

interface FormData {
  name: string;
  code: string;
  reference: string;
  location: string;
}

interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory?: Category;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function UpdateModal({
  open,
  setOpen,
  selectedCategory,
  mutate,
}: UpdateModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({});

  useEffect(() => {
    // Reset form jika selectedCategory berubah
    if (selectedCategory) {
      reset({
        name: selectedCategory.name || "",
        code: selectedCategory.code || "",
        reference: selectedCategory.reference || "",
        location: selectedCategory.location || "",
      });
    }
  }, [selectedCategory, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const api = new Api();
      api.url = `category/update/${selectedCategory?.id}`;
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        name: data.name,
        code: data.code,
        reference: data.reference,
        location: data.location,
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
      toast.error("Error creating category: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    reset(); // Reset form when modal is closed or canceled
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
                Perbarui Kategori
              </h2>
              <p className="text-xs text-gray-500">
                Edit detail kategori agar konsisten.
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
                      Nama Kategori
                    </label>
                    <span className="text-sm font-medium text-primaryRed">*</span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Masukkan nama kategori"
                    {...register("name", {
                      required: "Nama kategori diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.name && (
                    <p className="text-xs text-primaryRed">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Kode Kategori
                    </label>
                    <span className="text-sm font-medium text-primaryRed">*</span>
                  </div>
                  <input
                    type="text"
                    id="code"
                    placeholder="Masukkan kode kategori"
                    {...register("code", {
                      required: "Kode kategori diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.code && (
                    <p className="text-xs text-primaryRed">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="reference"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Referensi
                    </label>
                    <span className="text-sm font-medium text-primaryRed">*</span>
                  </div>
                  <input
                    type="text"
                    id="reference"
                    placeholder="Masukkan referensi kategori"
                    {...register("reference", {
                      required: "Referensi kategori diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.reference && (
                    <p className="text-xs text-primaryRed">
                      {errors.reference.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Lokasi
                    </label>
                    <span className="text-sm font-medium text-primaryRed">*</span>
                  </div>
                  <input
                    type="text"
                    id="location"
                    placeholder="Masukkan lokasi"
                    {...register("location", { required: "Lokasi diperlukan" })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.location && (
                    <p className="text-xs text-primaryRed">
                      {errors.location.message}
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
