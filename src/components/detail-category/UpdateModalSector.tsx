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
        <span className="text-sm font-bold text-left">Update Sector</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Name</span>
            <input
              type="text"
              placeholder="Input category name"
              {...register("name", { required: "Name is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Number</span>
            <input
              type="text"
              placeholder="Input category code"
              {...register("no", { required: "Number is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.no && (
              <p className="text-xs text-red-500">{errors.no.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Source</span>
            <input
              type="text"
              placeholder="Input category source"
              {...register("source")}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
          </div>
          {errors.source && (
            <p className="text-xs text-red-500">{errors.source.message}</p>
          )}

          <div
            className="flex gap-5 justify-end
          "
          >
            <button
              onClick={handleCancel}
              type="button"
              className="px-3 py-1.5 rounded-md border-black border text-xs font-semibold text-black duration-300 hover:bg-gray-300 bg-white"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-3 py-1.5 rounded-md border-black border text-xs text-white font-semibold duration-300 hover:bg-gray-700 bg-black flex items-center gap-2 transition-all"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
