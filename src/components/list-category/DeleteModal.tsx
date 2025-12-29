import React, { useState } from "react";
import Modal from "../global/Modal";
import Api from "../../../service/Api";
import { Category } from "../../../types/Categories.type";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { KeyedMutator } from "swr";
import { IoTrashOutline } from "react-icons/io5";

interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory?: Category;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function DeleteModal({
  open,
  setOpen,
  selectedCategory,
  mutate,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    const api = new Api();
    api.method = "DELETE";
    api.url = `category/delete/${selectedCategory?.id}`;

    try {
      const res = await api.call();

      if (res.statusCode === 200) {
        toast.success(res.message);
        mutate();
        setOpen(false);
      } else {
        toast.error(res.message || "Gagal menghapus kategori. Coba lagi.");
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-primaryRed via-primaryRedLighter to-primaryRedDarker" />
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryRed/10 text-primaryRed">
              <IoTrashOutline className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Hapus Kategori
              </h2>
              <p className="text-xs text-gray-500">
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4 text-sm text-gray-700">
            Apakah Anda yakin ingin menghapus kategori{" "}
            <span className="font-semibold text-gray-900">
              {selectedCategory?.name}
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
              onClick={handleDelete}
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryRed px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(227,30,36,0.85)] transition duration-200 hover:bg-primaryRedDarker disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && <CgSpinner className="h-4 w-4 animate-spin" />}
              Hapus
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
