import ClientSide from "@/components/dashboard/ClientSide";
import Master from "@/components/global/Master";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import { cookies } from "next/headers";

export default async function Home() {
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
