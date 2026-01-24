import ClientSide from "@/components/dashboard/ClientSide";
import Master from "@/components/global/Master";
import { getSession } from "../../lib/auth";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - AplOEs",
};

export default async function Home() {
  const session = await getSession();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <Master>
      <ClientSide session={session} accessToken={accessToken} />
    </Master>
  );
}
