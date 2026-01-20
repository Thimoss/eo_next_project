import Master from "@/components/global/Master";
import ClientSide from "@/components/profile/ClientSide";
import React from "react";
import { getSession } from "../../../lib/auth";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil - Owner Estimate",
};

export default async function Profile() {
  const session = await getSession();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return (
    <Master>
      <ClientSide session={session} accessToken={accessToken} />
    </Master>
  );
}
