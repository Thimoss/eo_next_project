import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition-colors ${
        open ? "visible bg-black/40 backdrop-blur-[1px]" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.65)] transition-all ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } max-h-[85vh]`}
      >
        {children}
      </div>
    </div>
  );
}
