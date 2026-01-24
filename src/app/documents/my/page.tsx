import Master from "@/components/global/Master";
import DocumentListPage from "@/components/documents/DocumentListPage";
import { getSession } from "../../../../lib/auth";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumen Saya - AplOEs",
};

export default async function MyDocumentsPage() {
  const session = await getSession();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <Master>
      <DocumentListPage
        title="Dokumen Saya"
        description="Semua dokumen yang kamu buat dan kelola."
        scope="created"
        accessToken={accessToken}
        session={session}
      />
    </Master>
  );
}
