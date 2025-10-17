import React, { useState } from "react";
import { KeyedMutator } from "swr";
import Modal from "../global/Modal";
import { CgSpinner } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../service/Api";

interface FormData {
  name: string;
}

interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  documentId: number;
}

export default function CreateModalSection({
  open,
  setOpen,
  mutate,
  documentId,
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
      api.url = "job-section/create";
      api.method = "POST";
      api.type = "json";
      api.body = {
        name: data.name,
        documentId: documentId,
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
      toast.error("Error creating document: " + error.message);
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
          Tambah Sektor Pekerjaan
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">
                Nama Sektor Pekerjaan
              </span>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>

            <input
              type="text"
              placeholder="Masukkan nama sektor pekerjaan"
              {...register("name", {
                required: "Nama sektor pekerjaan diperlukan",
              })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.name && (
              <p className="text-xs text-primaryRed">{errors.name.message}</p>
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
