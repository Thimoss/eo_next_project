import EmptyData from "@/components/global/EmptyData";
import Loading from "@/components/global/Loading";
import Master from "@/components/global/Master";
import Example from "@/components/global/Modal";
import NoResults from "@/components/global/NoResults";
import Pagination from "@/components/global/Pagination";
import React from "react";

export default function Typography() {
  return (
    <Master>
      <div className="flex flex-col gap-10">
        {/* Show Modal */}
        <Example />

        {/* No Results */}
        <NoResults />

        {/* Empty */}
        <EmptyData />
        {/* Load */}
        <Loading />

        {/* Pagination */}
        <Pagination />
      </div>
    </Master>
  );
}
