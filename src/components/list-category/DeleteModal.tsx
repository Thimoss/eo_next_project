import React from "react";
import Modal from "../global/Modal";
import { CategoryProps } from "@/app/list-category/page";

interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory?: CategoryProps;
}

export default function DeleteModal({
  open,
  setOpen,
  selectedCategory,
}: DeleteModalProps) {
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Delete Category</span>
        <div className="flex flex-col gap-5">
          <p className="text-xs">
            Are you sure you want to delete the{" "}
            <strong>{selectedCategory?.name}</strong>?
          </p>

          <div
            className="flex gap-5 justify-end
          "
          >
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 rounded-md border-black border text-xs font-semibold text-black duration-300 hover:bg-gray-300 bg-white"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 rounded-md border-black border text-xs text-white font-semibold duration-300 hover:bg-gray-700 bg-black h-full"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
