import ClientSide from "@/components/document/ClientSide";
import Master from "@/components/global/Master";

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { slug } = await params;

  return (
    <Master>
      <ClientSide slug={slug} />
    </Master>
  );
}
