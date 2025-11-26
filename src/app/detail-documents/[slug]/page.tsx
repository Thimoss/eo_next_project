import ClientSide from "@/components/document/ClientSide";
import Master from "@/components/global/Master";
import { getSession } from "../../../../lib/auth";
import { cookies } from "next/headers";

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { slug } = await params;
  const session = await getSession();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <Master>
      <ClientSide slug={slug} session={session} accessToken={accessToken} />
    </Master>
  );
}
