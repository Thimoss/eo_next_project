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
    <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-4xl">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primaryBlue/35 via-primaryRed/20 to-primaryGreen/35 blur-2xl opacity-80 sm:rounded-[2.5rem]" />
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl motion-safe:animate-[fade-slide_700ms_ease-out] sm:rounded-[2.5rem]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative order-2 flex flex-col justify-between gap-6 bg-gradient-to-br from-primaryBlue via-primaryBlueDarker to-slate-900 px-6 py-8 text-white sm:gap-8 sm:px-8 sm:py-10 lg:order-1">
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_45%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.2),transparent_55%)]" />
            <div className="relative z-10 flex flex-col gap-8">
              <Image
                draggable={false}
                src="/logo_1.png"
                alt="Pertamina Logo"
                width={160}
                height={37}
              />
              <div
                className="space-y-3 opacity-0 motion-safe:animate-[fade-slide_700ms_ease-out_forwards] motion-reduce:opacity-100"
                style={{ animationDelay: "80ms" }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                  AplOEs
                </p>
                <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                  Selamat Datang
                </h2>
                <p className="text-sm text-white/75">
                  Masuk untuk melanjutkan pengelolaan Owner Estimate.
                </p>
              </div>
            </div>
            <div
              className="relative z-10 grid gap-2 text-xs text-white/75 opacity-0 motion-safe:animate-[fade-slide_700ms_ease-out_forwards] motion-reduce:opacity-100 sm:gap-3 sm:text-sm"
              style={{ animationDelay: "160ms" }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primaryGreen" />
                <span>Akses cepat untuk tim operasional</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primaryRed" />
                <span>Monitoring Owner Estimate real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primaryBlueLighter" />
                <span>Kontrol penuh dokumentasi acara</span>
              </div>
            </div>
          </div>
          <div className="order-1 bg-white px-6 py-8 text-slate-900 sm:px-8 sm:py-10 lg:order-2">
            <div
              className="flex flex-col gap-2 opacity-0 motion-safe:animate-[fade-slide_700ms_ease-out_forwards] motion-reduce:opacity-100"
              style={{ animationDelay: "120ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primaryBlue">
                Login
              </p>
              <h3 className="text-xl font-semibold sm:text-2xl">
                Masuk ke akun Anda
              </h3>
              <p className="text-sm text-slate-500">
                Gunakan email kerja terdaftar untuk melanjutkan.
              </p>
            </div>

            <form
              action={async (formData) => {
                formAction(formData);
              }}
              className="mt-6 grid gap-4 opacity-0 motion-safe:animate-[fade-slide_700ms_ease-out_forwards] motion-reduce:opacity-100 sm:mt-8 sm:gap-5"
              style={{ animationDelay: "220ms" }}
            >
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-600"
                >
                  Alamat Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-primaryBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-primaryBlue/20"
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-600"
                >
                  Kata Sandi
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-primaryBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-primaryBlue/20"
                  placeholder="******"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-primaryBlue px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(0,110,182,0.7)] transition hover:bg-primaryBlueDarker focus:outline-none focus:ring-2 focus:ring-primaryBlue/30 disabled:cursor-not-allowed disabled:bg-primaryBlueLighter disabled:shadow-none"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.35),transparent_55%)] opacity-0 transition group-hover:opacity-100" />
                <span className="relative z-10">
                  {pending ? "Memproses..." : "Masuk"}
                </span>
              </button>
              <p className="text-xs text-slate-400">
                Butuh bantuan? Hubungi admin untuk akses akun.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
