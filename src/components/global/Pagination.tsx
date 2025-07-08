import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Pagination() {
  return (
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
            <div>
              <IoChevronBack />
            </div>
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
            <div>
              <IoChevronForward />
            </div>
          </a>
        </li>
      </ul>
    </nav>
  );
}
