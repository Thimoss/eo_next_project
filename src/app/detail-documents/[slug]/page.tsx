import ClientSide from "@/components/document/ClientSide";
import Master from "@/components/global/Master";
import { cookies } from "next/headers";
import { getSession } from "../../../../lib/auth";
import type { Metadata } from "next";

type tParams = Promise<{ slug: string }>;

export const metadata: Metadata = {
  title: "Detail Dokumen - Owner Estimate",
};

export default async function Page({ params }: { params: tParams }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const session = await getSession();

  return (
    <Master>
      <ClientSide slug={slug} accessToken={accessToken} session={session} />
    </Master>
  );
}
