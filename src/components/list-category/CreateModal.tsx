import React, { useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";

interface FormData {
  name: string;
  code: string;
  reference: string;
  location: string;
}
interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function CreateModal({
  open,
  setOpen,
  mutate,
}: CreateModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    // control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const api = new Api();
      api.url = "category/create";
      api.method = "POST";
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
    reset();
    setOpen(false);
    clearErrors();
  };
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-6">
        <span className="text-xl text-gray-700 font-bold text-left">
          Tambah Kategori
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Nama Kategori
              </label>
              <span className="text-sm font-medium text-primaryRed">*</span>
            </div>
            <input
              type="text"
              id="name"
              placeholder="Masukkan nama kategori"
              {...register("name", { required: "Nama kategori diperlukan" })}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
            {errors.name && (
              <p className="text-xs text-primaryRed">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-600"
              >
                Kode Kategori
              </label>
              <span className="text-sm font-medium text-primaryRed">*</span>
            </div>
            <input
              type="text"
              id="code"
              placeholder="Masukkan kode kategori"
              {...register("code", { required: "Kode kategori diperlukan" })}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
            {errors.code && (
              <p className="text-xs text-primaryRed">{errors.code.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="reference "
                className="block text-sm font-medium text-gray-600"
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
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
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
                className="block text-sm font-medium text-gray-600"
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
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
            {errors.location && (
              <p className="text-xs text-primaryRed">
                {errors.location.message}
              </p>
            )}
          </div>

          <div
            className="flex gap-5 justify-end
          "
          >
            <button
              onClick={handleCancel}
              type="button"
              className="text-sm px-4 py-2 bg-primaryRed text-white font-bold rounded-md hover:bg-primaryRedDarker disabled:bg-primaryRedLighter transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 shadow-sm"
            >
              Batal
            </button>
            <button
              disabled={loading}
              type="submit"
              className="text-sm px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker disabled:bg-primaryGreenLighter transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 shadow-sm"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Tambah
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
