import DocumentInformation from "@/components/document/DocumentInformation";
import Master from "@/components/global/Master";
import React from "react";

export default function Document() {
  return (
    <Master>
      <div>
        {/* Document Information */}
        <DocumentInformation />
        {/* Data Table */}
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table
            className="w-full text-center text-black text-xs "
            align="center"
          >
            <thead className="text-xs text-black uppercase bg-white">
              {" "}
              <tr>
                <th scope="col" rowSpan={2} className="px-6 py-3">
                  No
                </th>
                <th scope="col" rowSpan={2} className="px-6 py-3">
                  Job description
                </th>
                <th scope="col" rowSpan={2} className="px-6 py-3">
                  Volume
                </th>
                <th scope="col" colSpan={2} className="px-6 py-3">
                  UNIT PRICE
                </th>
                <th scope="col" colSpan={2} className="px-6 py-3">
                  TOTAL PRICE
                </th>
                <th scope="col" rowSpan={2} className="px-6 py-3">
                  INFORMATION
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">
                  MATERIAL
                </th>
                <th scope="col" className="px-6 py-3">
                  SERVICE
                </th>
                <th scope="col" className="px-6 py-3">
                  MATERIAL
                </th>
                <th scope="col" className="px-6 py-3">
                  SERVICE
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </Master>
  );
}
