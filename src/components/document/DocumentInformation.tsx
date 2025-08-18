import React from "react";

export default function DocumentInformation({ job, location, base }) {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <span className="font-semibold underline">OWNER ESTIMATE (OE)</span>
      <div className="font-medium flex gap-2 pt-2">
        <span>PEKERJAAN</span>
        <span>:</span>
        <span>{job === "" ? "-" : job}</span>
      </div>
      <div className="font-medium flex gap-2">
        <span>LOKASI</span>
        <span>:</span>
        <span>{location === "" ? "-" : location}</span>
      </div>
      <div className="font-medium flex gap-2">
        <span>DASAR</span>
        <span>:</span>
        <span>{base === "" ? "-" : base}</span>
      </div>
    </div>
  );
}
