"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { UserSession } from "../../../types/Session.type";
import { IoClose, IoMenu } from "react-icons/io5";
import { logout } from "@/actions/auth";

interface NavbarProps {
  session?: UserSession | null;
}

const getInitials = (name: string) => {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials.slice(0, 1);
};

export default function Navbar({ session }: NavbarProps) {
  const initials = getInitials(session?.name ?? "");

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="w-full bg-white py-5 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-0 flex items-center justify-between">
        <div className="flex items-center justify-between md:justify-start gap-10 w-full md:w-auto">
          <div>
            <Link href={"/"}>
              <Image
                draggable={false}
                className="cursor-pointer"
                src="/logo_1.png"
                alt="Pertamina Logo"
                width={160}
                height={37}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <div className="text-black hover:text-primaryBlue text-sm hover:underline font-semibold">
              <Link href={"/"}>Dashboard</Link>
            </div>
            <div className="text-black hover:text-primaryBlue text-sm hover:underline font-semibold">
              <Link href={"/list-category"}>Kategori</Link>
            </div>
            <div className="text-black hover:text-primaryBlue text-sm hover:underline font-semibold">
              <Link href={"/list-user"}>Daftar Pengguna</Link>
            </div>
          </div>

          {/* Hamburger Button (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-black focus:outline-none cursor-pointer rounded-md hover:bg-gray-200 text-2xl p-2 transition duration-300 ease-in-out"
            >
              <IoMenu />
            </button>
          </div>
        </div>

        <div className="hidden md:flex">
          <div className="flex items-center gap-2 text-xs">
            <h1 className="text-sm font-normal text-gray-700">
              {session?.name}
            </h1>

            <div className="relative">
              <div
                ref={avatarRef}
                onClick={toggleMenu}
                className="aspect-square bg-primaryBlue rounded-full flex items-center justify-center h-[40px] border-2 border-primaryBlueLighter overflow-hidden cursor-pointer text-white text-center text-xl"
              >
                {initials}
              </div>
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute bg-white text-sm font-semibold px-4 py-2 right-0 shadow-sm rounded-md space-y-1 text-left w-40"
                >
                  <Link href={"/profile"}>
                    <div className="px-4 py-2 cursor-pointer transition duration-300 hover:bg-gray-100 rounded-md">
                      Profil
                    </div>
                  </Link>

                  <div
                    onClick={handleLogout}
                    className="px-4 text-primaryRed py-2 cursor-pointer transition duration-300 hover:bg-gray-100 rounded-md"
                  >
                    Keluar
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 right-0 bg-white w-64 h-full shadow-md transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-5 gap-5">
          <div>
            <button
              onClick={toggleSidebar}
              className="text-black focus:outline-none cursor-pointer rounded-md hover:bg-gray-200 text-2xl p-2 transition duration-300 ease-in-out"
            >
              <IoClose />
            </button>
          </div>

          <Link href={"/profile"}>
            <div className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-200 transition duration-300 ease-in-out">
              <div className="aspect-square bg-primaryBlue rounded-full flex items-center justify-center h-[40px] border-2 border-primaryBlueLighter overflow-hidden cursor-pointer text-white text-center text-xl">
                {initials}
              </div>
              <h1 className="font-normal text-gray-700">{session?.name}</h1>
            </div>
          </Link>
          <Link href={"/"}>
            <div className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-200 transition duration-300 ease-in-out">
              <h1 className=" font-normal text-gray-700">Dashboard</h1>
            </div>
          </Link>
          <Link href={"/list-category"}>
            <div className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-200 transition duration-300 ease-in-out">
              <h1 className=" font-normal text-gray-700">Kategori</h1>
            </div>
          </Link>
          <Link href={"/list-user"}>
            <div className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-200 transition duration-300 ease-in-out">
              <h1 className=" font-normal text-gray-700">Daftar Pengguna</h1>
            </div>
          </Link>

          <div
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            <h1 className=" font-semibold text-primaryRed">Keluar</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
