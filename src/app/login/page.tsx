import LoginForm from "@/components/login/LoginForm";
import { getSession } from "../../../lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk - Owner Estimate",
};

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-slate-100 sm:min-h-screen">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2">
          <div className="h-80 w-80 rounded-full bg-primaryBlue/30 blur-3xl motion-safe:animate-[float_12s_ease-in-out_infinite]" />
        </div>
        <div className="absolute -bottom-28 -right-16">
          <div className="h-72 w-72 rounded-full bg-primaryRed/30 blur-3xl motion-safe:animate-[float_14s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/3 -left-20">
          <div className="h-64 w-64 rounded-full bg-primaryGreen/25 blur-3xl motion-safe:animate-[float_16s_ease-in-out_infinite]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_35%,rgba(255,255,255,0.04))]" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl items-start px-4 py-10 sm:min-h-screen sm:items-center sm:px-6 sm:py-12 lg:px-8">
        <LoginForm />
      </div>
    </div>
  );
}
