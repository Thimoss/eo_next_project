"use client";
import React from "react";
import { IoTrash } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { UserSession } from "../../../types/Session.type";

interface TableProps {
  users: UserSession[];
  handleReset: (user: UserSession) => Promise<void>;
  handleDelete: (user: UserSession) => Promise<void>;
}
export default function Table({
  users,
  handleReset,
  handleDelete,
}: TableProps) {
  return (
    <div className="relative overflow-x-auto rounded-lg shadow-sm">
      <table className="w-full text-center text-black text-xs" align="center">
        <thead className="text-sm text-white uppercase bg-primaryBlue">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Nomor Telepon
            </th>
            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200 text-gray-700 text-sm"
            >
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">
                <span
                  // onClick={() => handleDetail(category)}
                  className="hover:text-primaryBlue"
                >
                  {user.name}
                </span>
              </td>
              <td className="px-6 py-3"> {user.email}</td>
              <td className="px-6 py-3"> {user.phoneNumber}</td>
              <td className="px-6 py-3 flex items-center gap-2 justify-center">
                <button
                  onClick={() => handleReset(user)}
                  className="text-white bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker rounded-md px-2 py-1 duration-300 transition ease-in-out  cursor-pointer"
                >
                  <div className="w-4 h-4">
                    <FaArrowsRotate className="w-full h-full" />
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="text-white bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker rounded-md px-2 py-1 transition duration-300 ease-in-out  cursor-pointer"
                >
                  <div className="w-4 h-4">
                    <IoTrash className="w-full h-full" />
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
