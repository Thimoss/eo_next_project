import Master from "@/components/global/Master";
import Search from "@/components/list-category/Search";
import React from "react";
import { IoAdd } from "react-icons/io5";

const categories = [
  { id: 1, initial: "A", name: "Kategori A", code: "A001" },
  { id: 2, initial: "B", name: "Kategori B", code: "B002" },
  { id: 3, initial: "C", name: "Kategori C", code: "C003" },
  { id: 4, initial: "D", name: "Kategori D", code: "D004" },
  { id: 5, initial: "E", name: "Kategori E", code: "E005" },
];

export default function ListCategory() {
  return (
    <Master>
      <div className="flex flex-col gap-5">
        <h1 className="text-black font-bold">List Category</h1>
        <div className="flex items-center justify-between ">
          <Search />
          <div>
            <button className="flex items-center gap-2 text-white bg-black hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md">
              <div className="w-4 h-4">
                <IoAdd className="w-full h-full" />
              </div>
              <span className="text-xs font-semibold">Add</span>
            </button>
          </div>
        </div>

        {/* Table */}
        {/* No, Nama Kategori, Kode */}
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table
            className="w-full text-center  text-black text-xs"
            align="center"
          >
            <thead className="text-xs text-black uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 py-3">{category.id}</td>
                  <td className="px-6 py-3">{category.name}</td>
                  <td className="px-6 py-3">{category.initial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav
          aria-label="Page navigation example"
          className="flex items-center justify-center"
        >
          <ul className="flex items-center -space-x-px h-8 text-xs">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-black bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Master>
  );
}
