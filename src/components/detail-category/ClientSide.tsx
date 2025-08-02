import React from "react";
import Search from "./Search";

export default function ClientSide() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold">
          <p>AHS</p>
          <p>DEs</p>
          <p>Kategori:</p>
        </div>

        <p className="text-xs font-semibold">Lokasi</p>

        <div>
          <Search />
        </div>
      </div>
    </div>
  );
}
