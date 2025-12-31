import React, { useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { KeyedMutator } from "swr";
import { IoPersonAddOutline } from "react-icons/io5";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}
interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function CreateModal({
  open,
  setOpen,
  mutate,
  accessToken,
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
      api.auth = true;
      api.token = accessToken ?? "";
      api.url = "users/create";
      api.method = "POST";
      api.type = "json";
      api.body = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
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
      toast.error("Terjadi kesalahan saat membuat pengguna: " + error.message);
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-primaryGreen via-primaryBlue to-primaryGreenLighter" />
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryGreen/10 text-primaryGreen">
              <IoPersonAddOutline className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Tambah Pengguna
              </h2>
              <p className="text-xs text-gray-500">
                Masukkan detail pengguna baru untuk akses sistem.
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
                      Nama Pengguna
                    </label>
                    <span className="text-sm font-medium text-primaryRed">*</span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Masukkan nama pengguna"
                    {...register("name", {
                      required: "Nama pengguna diperlukan",
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
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <span className="text-sm font-medium text-primaryRed">*</span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Masukkan email pengguna"
                    {...register("email", {
                      required: "Email pengguna diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.email && (
                    <p className="text-xs text-primaryRed">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nomor Telepon
                    </label>
                    <span className="text-sm font-medium text-primaryRed">*</span>
                  </div>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Masukkan nomor telepon pengguna"
                    {...register("phoneNumber", {
                      required: "Nomor telepon pengguna diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-primaryRed">
                      {errors.phoneNumber.message}
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryGreen px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] transition duration-200 hover:bg-primaryGreenDarker disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <CgSpinner className="h-4 w-4 animate-spin" />}
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
