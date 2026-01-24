import Master from "@/components/global/Master";
import DocumentListPage from "@/components/documents/DocumentListPage";
import { getSession } from "../../../../lib/auth";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumen Untuk Konfirmasi - Owner Estimate",
};

export default async function ConfirmDocumentsPage() {
  const session = await getSession();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <Master>
      <DocumentListPage
        title="Dokumen Untuk Konfirmasi"
        description="Dokumen yang perlu kamu konfirmasi sebagai confirmer."
        scope="confirm"
        accessToken={accessToken}
        session={session}
      />
    </Master>
  );
}
