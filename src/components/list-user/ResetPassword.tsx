import React, { useState } from "react";
import Modal from "../global/Modal";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { KeyedMutator } from "swr";
import { UserSession } from "../../../types/Session.type";
import { IoKeyOutline } from "react-icons/io5";

interface ResetModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser?: UserSession;
  accessToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function ResetModal({
  open,
  setOpen,
  selectedUser,
  accessToken,
  mutate,
}: ResetModalProps) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(null);

  const handleReset = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    const api = new Api();
    api.method = "PATCH";
    api.auth = true;
    api.token = accessToken ?? "";
    api.url = `users/reset-password/${selectedUser?.id}`;

    try {
      const res = await api.call();

      if (res.statusCode === 200) {
        toast.success(res.message);
        mutate();
        setOpen(false);
      } else {
        toast.error(
          res.message || "Gagal mereset kata sandi pengguna. Coba lagi."
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        "Terjadi kesalahan saat menghubungi server. Coba lagi nanti."
      );
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-primaryBlue via-primaryGreen to-primaryBlueLighter" />
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryBlue/10 text-primaryBlue">
              <IoKeyOutline className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Reset Kata Sandi
              </h2>
              <p className="text-xs text-gray-500">
                Pastikan pengguna mengetahui kata sandi baru setelah reset.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 text-sm text-gray-700">
            Apakah Anda yakin ingin mereset kata sandi pengguna{" "}
            <span className="font-semibold text-gray-900">
              {selectedUser?.name}
            </span>
            ?
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              disabled={loading}
              onClick={handleReset}
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.85)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && <CgSpinner className="h-4 w-4 animate-spin" />}
              Reset
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
