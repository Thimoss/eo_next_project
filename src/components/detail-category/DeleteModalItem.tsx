/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Modal from "../global/Modal";

import { CgSpinner } from "react-icons/cg";
import { KeyedMutator } from "swr";
import { toast } from "react-toastify";
import { Item } from "../../../types/Items.type";
import Api from "../../../service/Api";

interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: Item | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function DeleteModalItem({
  open,
  setOpen,
  mutate,
  selectedItem,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    const api = new Api();
    api.method = "DELETE";
    api.url = `item/delete/${selectedItem?.id}`;

    try {
      const res = await api.call();

      if (res.statusCode === 200) {
        toast.success(res.message);
        mutate();
        setOpen(false);
      } else {
        toast.error(res.message || "Gagal menghapus item. Coba lagi.");
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
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Delete Item</span>
        <div className="flex flex-col gap-5">
          <p className="text-xs">
            Are you sure you want to delete the{" "}
            <strong>{selectedItem?.name}</strong>?
          </p>

          <div
            className="flex gap-5 justify-end
          "
          >
            <button
              onClick={() => setOpen(false)}
              className=" cursor-pointer px-3 py-1.5 rounded-md border-black border text-xs font-semibold text-black duration-300 hover:bg-gray-300 bg-white"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleDelete}
              className=" cursor-pointer px-3 py-1.5 rounded-md border-black border text-xs text-white font-semibold duration-300 hover:bg-gray-700 bg-black flex items-center gap-2 transition-all"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
