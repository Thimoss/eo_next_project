import EmptyData from "@/components/global/EmptyData";
import Loading from "@/components/global/Loading";
import Master from "@/components/global/Master";
import NoResults from "@/components/global/NoResults";
import React from "react";

export default function Typography() {
  return (
    <Master>
      <div className="flex flex-col gap-10">
        {/* No Results */}
        <NoResults />

        {/* Empty */}
        <EmptyData />
        {/* Load */}
        <Loading />
      </div>
    </Master>
  );
}
