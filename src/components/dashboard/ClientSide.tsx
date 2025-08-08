"use client";
import React from "react";
import Search from "./Search";
import SortBy from "./SortBy";
// import DocumentCard from "./DocumentCard";
// import { useDashboard } from "../../../hooks/Dashboard";

export default function ClientSide() {
  //   const { data, error, isLoading, mutate } = useDashboard;
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <Search />
        <SortBy />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
        {/* {data.map((item) => (
          <DocumentCard item={item} key={item} />
        ))} */}
      </div>
    </div>
  );
}
