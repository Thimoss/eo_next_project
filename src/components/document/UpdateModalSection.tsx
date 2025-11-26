import React, { useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import Modal from "../global/Modal";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import Api from "../../../service/Api";
import { useForm } from "react-hook-form";
import { JobSection } from "../../../types/Documents.type";

interface FormData {
  name: string;
}

interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  selectedJobSection: JobSection | null | undefined;
  documentId: number;
  accessToken?: string;
}

export default function UpdateModalSection({
  open,
  setOpen,
  mutate,
  selectedJobSection,
  documentId,
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
  } = useForm<FormData>({});

  useEffect(() => {
    if (selectedJobSection) {
      reset({
        name: selectedJobSection.name || "",
      });
    }
  }, [selectedJobSection, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `job-section/update/${selectedJobSection?.id}`;
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "PATCH";
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
      <div className="flex flex-col gap-6">
        <span className="text-xl text-gray-700 font-bold text-left">
          Perbarui Sektor Pekerjaan
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Nama Sektor Pekerjaan
              </label>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>

            <input
              type="text"
              id="name"
              placeholder="Masukkan nama sektor pekerjaan"
              {...register("name", {
                required: "Nama sektor pekerjaan diperlukan",
              })}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
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
