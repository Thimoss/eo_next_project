import React from "react";
import Modal from "../global/Modal";
import { CategoryProps } from "@/app/list-category/page";

interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory?: CategoryProps;
}

export default function UpdateModal({
  open,
  setOpen,
  selectedCategory,
}: UpdateModalProps) {
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Update Category</span>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Name</span>
            <input
              type="text"
              placeholder="Input category name"
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
              value={selectedCategory?.name}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Code</span>
            <input
              type="text"
              placeholder="Input category code"
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
              value={selectedCategory?.code}
            />
          </div>
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
