import Master from "@/components/global/Master";
import React from "react";
import ClientSide from "@/components/list-category/ClientSide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Kategori - AplOEs",
};

export default function ListCategory() {
  return (
    <Master>
      <ClientSide />
    </Master>
  );
}
