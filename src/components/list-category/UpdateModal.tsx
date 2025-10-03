import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { Category } from "../../../types/Categories.type";
import { KeyedMutator } from "swr";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../service/Api";
import { CgSpinner } from "react-icons/cg";

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
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Perbarui Kategori</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Nama Kategori</span>
              <span className="text-md font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan nama kategori"
              {...register("name", { required: "Nama kategori diperlukan" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Kode Kategori</span>
              <span className="text-md font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan kode kategori"
              {...register("code", { required: "Kode kategori diperlukan" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.code && (
              <p className="text-xs text-red-500">{errors.code.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Referensi</span>
              <span className="text-md font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan referensi kategori"
              {...register("reference", {
                required: "Referensi kategori diperlukan",
              })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
          </div>
          {errors.reference && (
            <p className="text-xs text-red-500">{errors.reference.message}</p>
          )}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Lokasi</span>
              <span className="text-md font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan lokasi"
              {...register("location", { required: "Lokasi diperlukan" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="flex gap-5 justify-end">
            <button
              onClick={handleCancel}
              type="button"
              className="px-3 py-1.5 rounded-md  text-xs font-semibold text-white duration-300 bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker cursor-pointer"
            >
              Batal
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-3 py-1.5 rounded-md text-xs text-white font-semibold duration-300 bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker flex items-center gap-2 transition-all cursor-pointer"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
