import React from "react";
import SearchBar from "../global/SearchBar";

export default function Search() {
  return (
    <SearchBar
      placeholder="Cari pengguna..."
      showAction={false}
      containerClassName="max-w-xl"
    />
  );
}
