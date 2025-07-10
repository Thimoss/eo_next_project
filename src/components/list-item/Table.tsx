import React from "react";

export default function Table() {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-center text-black text-xs " align="center">
        <thead className="text-xs text-black uppercase bg-white">
          <tr>
            <th scope="col" rowSpan={2} className="px-6 py-3">
              Source
            </th>
            <th scope="col" rowSpan={2} className="px-6 py-3">
              No
            </th>
            <th scope="col" rowSpan={2} className="px-6 py-3">
              Job Types
            </th>
            <th scope="col" colSpan={2} className="px-6 py-3">
              Price
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3">
              Price 1
            </th>
            <th scope="col" className="px-6 py-3">
              Price 2
            </th>
          </tr>
        </thead>
        <tbody>{/* Tambahkan baris data di sini */}</tbody>
      </table>
    </div>
  );
}
