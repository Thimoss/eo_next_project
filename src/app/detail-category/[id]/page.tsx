import ClientSide from "@/components/detail-category/ClientSide";
import Master from "@/components/global/Master";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <Master>
      <ClientSide id={id} />
    </Master>
  );
}
