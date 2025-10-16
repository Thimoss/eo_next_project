import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { Sector } from "../../../types/Sectors.type";

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
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Perbarui Sektor</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Nama Sektor</span>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan nama sektor"
              {...register("name", { required: "Nama sektor diperlukan" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Nomor Sektor</span>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan nomor sektor"
              {...register("no", { required: "Nomor sektor diperlukan" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.no && (
              <p className="text-xs text-red-500">{errors.no.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Sumber</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan sumber"
              {...register("source")}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.source && (
              <p className="text-xs text-red-500">{errors.source.message}</p>
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
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
