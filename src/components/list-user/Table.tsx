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
    <div className="rounded-2xl border border-gray-200/70 bg-white p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-6">
      <div className="overflow-x-auto rounded-2xl border border-gray-200/80">
        <table className="min-w-[760px] w-full text-center text-sm text-gray-700">
          <thead className="bg-primaryBlue text-xs uppercase tracking-wider text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                No
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Nama
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Email
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Nomor Telepon
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200 text-gray-700"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-semibold">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phoneNumber}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReset(user)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryGreen text-white shadow-sm transition duration-200 hover:bg-primaryGreenDarker"
                    >
                      <FaArrowsRotate className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryRed text-white shadow-sm transition duration-200 hover:bg-primaryRedDarker"
                    >
                      <IoTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
