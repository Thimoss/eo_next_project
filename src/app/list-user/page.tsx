import Master from "@/components/global/Master";
import ClientSide from "@/components/list-user/ClientSide";
import React from "react";
import { getSession } from "../../../lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Pengguna - AplOEs",
};

export default async function ListUser() {
  const session = await getSession();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (session?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <Master>
      <ClientSide session={session} accessToken={accessToken} />
    </Master>
  );
}
