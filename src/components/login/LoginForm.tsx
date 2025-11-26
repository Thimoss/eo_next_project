"use client";
import { login } from "@/actions/auth";
import Image from "next/image";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const initialState = {
  error: undefined as string | undefined,
  success: undefined as string | undefined,
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  useEffect(() => {
    const showToastify = () => {
      if (state.error) {
        toast.error(state.error);
      }
      if (state.success) {
        toast.success(state.success);
      }
    };
    showToastify();
  }, [state]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-sm w-full flex flex-col gap-5">
      <div className="flex flex-col items-center gap-6">
        <Image
          draggable={false}
          src="/logo_1.png"
          alt="Pertamina Logo"
          width={160}
          height={37}
        />
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Selamat Datang
          </h2>
          <p className="text-center text-base font-normal text-gray-500">
            Masuk untuk melanjutkan
          </p>
        </div>
      </div>

      <form
        action={async (formData) => {
          formAction(formData);
        }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Alamat Email
          </label>
          <input
            type="email"
            name="email"
            className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Kata Sandi
          </label>
          <input
            type="password"
            name="password"
            minLength={6}
            className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            placeholder="******"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full py-2 disabled:bg-primaryBlueLighter bg-primaryBlue text-white font-bold rounded-md hover:bg-primaryBlueDarker transition duration-300 ease-in-out cursor-pointer"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
