import Master from "@/components/global/Master";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  console.log(slug);
  return (
    <Master>
      TEs
      {/* <ClientSide id={id} /> */}
    </Master>
  );
}
