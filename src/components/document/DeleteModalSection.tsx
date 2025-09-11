import React, { useState } from "react";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import Modal from "../global/Modal";
import { CgSpinner } from "react-icons/cg";
import { KeyedMutator } from "swr";
import { JobSection } from "../../../types/Documents.type";

interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedJobSection: JobSection | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function DeleteModalSection({
  open,
  setOpen,
  mutate,
  selectedJobSection,
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
    api.url = `job-section/delete/${selectedJobSection?.id}`;

    try {
      const res = await api.call();

      if (res.statusCode === 200) {
        toast.success(res.message);
        mutate();
        setOpen(false);
      } else {
        toast.error(res.message || "Gagal menghapus job section. Coba lagi.");
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
            <strong>{selectedJobSection?.name}</strong>?
          </p>

          <div
            className="flex gap-5 justify-end
          "
          >
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white duration-300 bg-primaryBlue disabled:bg-primaryBlueLighter hover:bg-primaryBlueDarker cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleDelete}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white duration-300 bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker cursor-pointer flex items-center justify-between"
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
