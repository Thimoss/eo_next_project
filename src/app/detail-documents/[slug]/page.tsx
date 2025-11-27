import ClientSide from "@/components/document/ClientSide";
import Master from "@/components/global/Master";
import { cookies } from "next/headers";

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <Master>
      <ClientSide slug={slug} accessToken={accessToken} />
    </Master>
  );
}
