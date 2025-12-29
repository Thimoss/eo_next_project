import React from "react";
import Navbar from "./Navbar";
import { getSession } from "../../../lib/auth";
import { redirect } from "next/navigation";

interface MasterProps {
  children: React.ReactNode;
}

export default async function Master({ children }: MasterProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar session={session} />
      <main className="w-full  flex-1 py-5 bg-gray-200">
        <div className="container mx-auto px-4 md:px-0">{children}</div>
      </main>
      <footer className="w-full border-t border-gray-200/70 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-0 py-4 text-center text-xs text-gray-500">
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-primaryGreen" />
            <span className="font-semibold text-gray-600">
              © 2025 Pertamina
            </span>
            <span className="hidden text-gray-300 sm:inline">|</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
