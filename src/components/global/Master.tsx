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
      <footer className="w-full bg-white py-2">
        <div className="container mx-auto px-4 md:px-0 text-center text-xs">
          © 2025 Pertamina. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
