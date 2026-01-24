"use client";
import React, { useRef } from "react";
import { CgSpinner } from "react-icons/cg";
import {
  IoCallOutline,
  IoCreateOutline,
  IoBriefcaseOutline,
  IoKeyOutline,
  IoMailOutline,
  IoPersonCircleOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { UserSession } from "../../../types/Session.type";
import { useProfile } from "../../../hooks/Profile";

interface ClientSideProps {
  session?: UserSession | null;
  accessToken?: string;
}

export default function ClientSide({ session, accessToken }: ClientSideProps) {
  const {
    isProfileLoading,
    isPasswordLoading,
    isEditing,
    setIsEditing,
    handleInputChange,
    profileData,
    resetProfileData,
    updateProfile,
    handlePasswordChange,
    updatePassword,
    passwords,
  } = useProfile({
    accessToken: accessToken!,
    session: session!,
  });

  const nameInitial = profileData?.name?.trim()
    ? profileData.name.trim().charAt(0).toUpperCase()
    : "U";
  const roleLabel = session?.role ?? "Pengguna";
  const profileSnapshotRef = useRef(profileData);

  const startEditing = () => {
    profileSnapshotRef.current = profileData;
    setIsEditing(true);
  };

  const cancelEditing = () => {
    resetProfileData(profileSnapshotRef.current);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] sm:p-8">
        <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-primaryBlue/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-44 w-44 rounded-full bg-primaryGreen/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primaryBlue">
              Profil
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
              Kelola Profil Anda
            </h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Perbarui informasi akun dan jaga keamanan kata sandi Anda.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primaryGreen" />
              {roleLabel}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
              <IoMailOutline className="h-3.5 w-3.5 text-primaryBlue" />
              <span className="max-w-[200px] truncate">
                {profileData.email}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primaryBlue/10 text-xl font-bold text-primaryBlue">
                  {nameInitial}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Informasi Profil
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-gray-800">
                    Data Pribadi
                  </h2>
                  <p className="text-xs text-gray-500">
                    Pastikan data akun tetap terbaru.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      disabled={isProfileLoading}
                      onClick={updateProfile}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primaryBlue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.85)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      {isProfileLoading ? (
                        <CgSpinner className="h-4 w-4 animate-spin" />
                      ) : (
                        <IoSaveOutline className="h-4 w-4" />
                      )}
                      Simpan Perubahan
                    </button>
                    <button
                      type="button"
                      disabled={isProfileLoading}
                      onClick={cancelEditing}
                      className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    disabled={isProfileLoading}
                    onClick={startEditing}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primaryBlue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.85)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    <IoCreateOutline className="h-4 w-4" />
                    Perbarui Profil
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <IoPersonCircleOutline className="h-4 w-4 text-primaryBlue" />
                    Nama
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      autoComplete="off"
                      value={profileData.name}
                      onChange={(e) => handleInputChange(e, "name")}
                      className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                    />
                  ) : (
                    <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700">
                      {profileData.name || "-"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="position"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <IoBriefcaseOutline className="h-4 w-4 text-primaryBlue" />
                    Jabatan
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="position"
                      value={profileData.position}
                      onChange={(e) => handleInputChange(e, "position")}
                      className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                    />
                  ) : (
                    <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700">
                      {profileData.position || "-"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <IoMailOutline className="h-4 w-4 text-primaryBlue" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                    />
                  ) : (
                    <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700">
                      {profileData.email || "-"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <IoCallOutline className="h-4 w-4 text-primaryBlue" />
                    Nomor Telepon
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="phone"
                      value={profileData.phoneNumber}
                      onChange={(e) => handleInputChange(e, "phoneNumber")}
                      className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                    />
                  ) : (
                    <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700">
                      {profileData.phoneNumber || "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryBlue/10 text-primaryBlue">
                <IoKeyOutline className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Ganti Kata Sandi
                </h2>
                <p className="text-xs text-gray-500">
                  Gunakan kata sandi yang kuat untuk menjaga keamanan akun.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="oldPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Kata Sandi Saat Ini
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwords.oldPassword}
                    minLength={6}
                    onChange={(e) => handlePasswordChange(e, "oldPassword")}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwords.newPassword}
                    minLength={6}
                    onChange={(e) => handlePasswordChange(e, "newPassword")}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="confirmNewPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    value={passwords.confirmNewPassword}
                    minLength={6}
                    onChange={(e) =>
                      handlePasswordChange(e, "confirmNewPassword")
                    }
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isPasswordLoading}
                onClick={updatePassword}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primaryBlue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.85)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isPasswordLoading ? (
                  <CgSpinner className="h-4 w-4 animate-spin" />
                ) : (
                  <IoKeyOutline className="h-4 w-4" />
                )}
                Ganti Kata Sandi
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
