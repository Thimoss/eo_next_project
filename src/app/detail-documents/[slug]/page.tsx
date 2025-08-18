import ClientSide from "@/components/document/ClientSide";
import Master from "@/components/global/Master";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  return (
    <Master>
      <ClientSide slug={slug} />
    </Master>
  );
}
