import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import { Document } from "../../../types/Documents.type";

interface FormData {
  name: string;
}
interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  selectedDocument: Document | null | undefined;
}

export default function UpdateModal({
  open,
  setOpen,
  mutate,
  selectedDocument,
}: UpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    // control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>();

  useEffect(() => {
    // Reset form jika selectedCategory berubah
    if (selectedDocument) {
      reset({
        name: selectedDocument?.name || "",
      });
    }
  }, [selectedDocument, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const api = new Api();
      api.url = `document/update/${selectedDocument?.id}`;
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        name: data.name,
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
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Edit Dokumen</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Nama Dokumen</span>
              <span className="text-md font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan nama dokumen"
              {...register("name", { required: "Nama dokumen diperlukan" })}
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
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white duration-300 bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker cursor-pointer  items-center justify-between flex"
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
