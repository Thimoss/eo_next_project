import React from "react";

export default function DocumentInformation() {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <span className="font-semibold underline">OWNER ESTIMATE (OE)</span>
      <div className="font-medium flex gap-2 pt-2">
        <span>PEKERJAAN</span>
        <span>:</span>
        <span>REBUILDING TANGKI TIMBUN KAP. 1 X 1500 KL IT LHOKSEUMAWE</span>
      </div>
      <div className="font-medium flex gap-2">
        <span>LOKASI</span>
        <span>:</span>
        <span>INTEGRATED TERMINAL LHOKSEUMAWE</span>
      </div>
      <div className="font-medium flex gap-2">
        <span>DASAR</span>
        <span>:</span>
        <span>ABI 2024 - MA No. 24.E01.01.011</span>
      </div>
    </div>
  );
}
