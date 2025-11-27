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
  accessToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  selectedDocument: Document | null | undefined;
}

export default function UpdateModal({
  open,
  setOpen,
  mutate,
  selectedDocument,
  accessToken,
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
      api.auth = true;
      api.token = accessToken ?? "";
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
      <div className="flex flex-col gap-6">
        <span className="text-xl text-gray-700 font-bold text-left">
          Edit Dokumen
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Nama Dokumen
              </label>
              <span className="text-sm font-medium text-primaryRed">*</span>
            </div>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Nama dokumen diperlukan" })}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
              placeholder="Masukkan nama dokumen"
            />
            {errors.name && (
              <p className="text-sm text-primaryRed">{errors.name.message}</p>
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
                  <CgSpinner className="w-4 h-4 text-center animate-spin" />
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
