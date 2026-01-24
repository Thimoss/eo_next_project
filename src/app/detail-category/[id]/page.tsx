import ClientSide from "@/components/detail-category/ClientSide";
import Master from "@/components/global/Master";
import React from "react";
import type { Metadata } from "next";
type tParams = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Detail Kategori - AplOEs",
};

export default async function Page({ params }: { params: tParams }) {
  const { id } = await params;
  return (
    <Master>
      <ClientSide id={id} />
    </Master>
  );
}
