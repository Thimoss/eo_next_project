import Master from "@/components/global/Master";
import DocumentListPage from "@/components/documents/DocumentListPage";
import { getSession } from "../../../../lib/auth";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumen Untuk Review - AplOEs",
};

export default async function ReviewDocumentsPage() {
  const session = await getSession();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <Master>
      <DocumentListPage
        title="Dokumen Untuk Review"
        description="Dokumen yang perlu kamu periksa sebagai checker."
        scope="review"
        accessToken={accessToken}
        session={session}
      />
    </Master>
  );
}
