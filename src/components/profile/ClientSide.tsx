/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { UserSession } from "../../../types/Session.type";

interface ClientSideProps {
  session?: UserSession | null;
  accessToken?: string;
}

export default function ClientSide({ session, accessToken }: ClientSideProps) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* General Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">Informasi Umum</h2>
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Nama
                </label>
                {isEditing.name && (
                  <span className="text-sm font-semibold text-primaryRed">
                    *
                  </span>
                )}
              </div>
              {isEditing.name ? (
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  defaultValue={session?.name}
                  // onChange={(e) => handleInputChange(e, "name")}
                  className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                />
              ) : (
                <p className="text-gray-700 text-sm">{session?.name}</p>
              )}
            </div>

            <button
              onClick={() =>
                setIsEditing({ ...isEditing, name: !isEditing.name })
              }
              className="text-blue-500 text-sm cursor-pointer"
            >
              {isEditing.name ? "Simpan" : "Perbarui"}
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                {isEditing.email && (
                  <span className="text-sm font-semibold text-primaryRed">
                    *
                  </span>
                )}
              </div>
              {isEditing.email ? (
                <input
                  type="email"
                  id="email"
                  defaultValue={session?.email}
                  // onChange={(e) => handleInputChange(e, "email")}
                  className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                />
              ) : (
                <p className="text-gray-700 text-sm">{session?.email}</p>
              )}
            </div>

            <button
              onClick={() =>
                setIsEditing({ ...isEditing, email: !isEditing.email })
              }
              className="text-blue-500 text-sm"
            >
              {isEditing.email ? "Simpan" : "Perbarui"}
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Nomor Telepon
                </label>
                {isEditing.email && (
                  <span className="text-sm font-semibold text-primaryRed">
                    *
                  </span>
                )}
              </div>
              {isEditing.phone ? (
                <input
                  type="text"
                  defaultValue={session?.phoneNumber}
                  // onChange={(e) => handleInputChange(e, "phone")}
                  className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                />
              ) : (
                <p className="text-gray-700 text-sm">{session?.phoneNumber}</p>
              )}
            </div>

            <button
              onClick={() =>
                setIsEditing({ ...isEditing, phone: !isEditing.phone })
              }
              className="text-blue-500 text-sm"
            >
              {isEditing.phone ? "Simpan" : "Perbarui"}
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Ganti Kata Sandi
        </h2>
        <div className="mt-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Kata Sandi Saat Ini
              </label>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="password"
              id="currentPassword"
              defaultValue={passwords.currentPassword}
              // onChange={(e) => handlePasswordChange(e, "currentPassword")}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Kata Sandi Baru
              </label>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="password"
              id="newPassword"
              defaultValue={passwords.newPassword}
              // onChange={(e) => handlePasswordChange(e, "newPassword")}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Konfirmasi Kata Sandi Baru
              </label>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="password"
              id="confirmNewPassword"
              defaultValue={passwords.confirmPassword}
              // onChange={(e) => handlePasswordChange(e, "confirmPassword")}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              //  disabled={loading || (!selectedNewItemJob && !selectedOldItemJob)}
              //  onClick={updateItem}
              className="text-sm px-4 py-2 bg-primaryBlue text-white font-bold rounded-md hover:bg-primaryBlueDarker disabled:bg-primaryBlueLighter transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 shadow-sm"
            >
              {/* {loading && (
                           <div>
                             <CgSpinner className="w-3 h-3 text-center animate-spin" />
                           </div>
                         )} */}
              Ganti Kata Sandi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
