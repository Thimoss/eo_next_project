import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div
      className="flex gap-5 w-full md:max-w-xs 
             "
    >
      <input
        type="text"
        id="query"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue bg-white text-gray-700"
        placeholder="Cari kategori..."
        required
      />
      <button className="px-4 py-2 bg-primaryBlue text-white font-bold rounded-md hover:bg-primaryBlueDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2 shadow-sm">
        <div className="w-4 h-4">
          <FaSearch className="w-full h-full" />
        </div>
        <span className="text-sm font-semibold">Cari</span>
      </button>
    </div>
  );
}
