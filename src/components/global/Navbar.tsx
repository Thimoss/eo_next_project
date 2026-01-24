"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/documents/my", label: "Dokumen Saya" },
  { href: "/documents/review", label: "Perlu Review" },
  { href: "/documents/confirm", label: "Perlu Konfirmasi" },
  { href: "/list-category", label: "Kategori" },
  { href: "/list-user", label: "Daftar Pengguna" },
];

export default function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();
  const initials = getInitials(session?.name ?? "");
  const navItems =
    session?.role === "ADMIN"
      ? NAV_ITEMS
      : NAV_ITEMS.filter((item) => item.href !== "/list-user");

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  useEffect(() => {
    setIsOpen(false);
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMounted) return;
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMounted, isSidebarOpen]);

  const handleLogout = async () => {
    await logout();
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const navLinkClasses = (href: string) =>
    [
      "relative text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue/30 focus-visible:ring-offset-2 hover:-translate-y-0.5",
      isActiveLink(href)
        ? "bg-primaryBlue/10 text-primaryBlue shadow-[inset_0_0_0_1px_rgba(0,110,182,0.2)] after:content-[''] after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primaryBlue after:to-primaryBlueLighter"
        : "text-gray-700 hover:text-primaryBlue hover:bg-primaryBlue/5",
    ].join(" ");

  return (
    <header className="relative w-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(255,255,255,0.9))] backdrop-blur-lg py-4  top-0 z-50 border-b border-gray-200/70 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.45)]">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="shrink-0">
              <Image
                draggable={false}
                className="cursor-pointer drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                src="/logo_1.png"
                alt="Pertamina Logo"
                width={160}
                height={37}
              />
            </Link>

            <nav
              className="hidden md:flex items-center gap-1 rounded-full bg-white/70 px-1 py-1 ring-1 ring-gray-200/70 shadow-sm"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClasses(item.href)}
                  aria-current={isActiveLink(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-sm font-normal text-gray-700">
                {session?.name}
              </div>

              <div className="relative">
                <button
                  ref={avatarRef}
                  type="button"
                  onClick={toggleMenu}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  className="aspect-square rounded-full flex items-center justify-center h-[40px] border-2 border-white overflow-hidden cursor-pointer text-white text-center text-xl bg-gradient-to-br from-primaryBlue to-primaryBlueDarker shadow-[0_10px_24px_-14px_rgba(0,110,182,0.7)] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue/30 focus-visible:ring-offset-2"
                >
                  {initials}
                </button>
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-3 w-48 rounded-lg border border-gray-100 bg-white/95 px-2 py-2 text-sm font-semibold text-left shadow-[0_18px_40px_-28px_rgba(15,23,42,0.5)] backdrop-blur-md space-y-1 before:content-[''] before:absolute before:-top-2 before:right-6 before:h-3 before:w-3 before:rotate-45 before:bg-white before:border-l before:border-t before:border-gray-100"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 cursor-pointer transition duration-200 hover:bg-gray-100 rounded-md"
                    >
                      Profil
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 text-primaryRed py-2 cursor-pointer transition duration-200 hover:bg-gray-100 rounded-md"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Buka menu"
              className="md:hidden text-gray-800 focus:outline-none cursor-pointer rounded-md hover:bg-gray-200 text-2xl p-2 transition duration-200 ease-in-out"
            >
              <IoMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      {isMounted &&
        createPortal(
          <>
            {isSidebarOpen && (
              <button
                type="button"
                aria-label="Tutup menu"
                onClick={toggleSidebar}
                className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px] md:hidden"
              />
            )}
            <div
              className={`fixed top-0 right-0 z-[70] h-full w-[280px] bg-white border-l border-gray-200/70 shadow-2xl transform transition-transform duration-300 rounded-l-2xl ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
              } md:hidden`}
            >
              <div className="flex flex-col p-5 gap-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Menu Navigasi
                  </div>
                  <button
                    onClick={toggleSidebar}
                    type="button"
                    className="text-black focus:outline-none cursor-pointer rounded-md hover:bg-gray-200 text-2xl p-2 transition duration-300 ease-in-out"
                  >
                    <IoClose />
                  </button>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 cursor-pointer rounded-xl p-3 bg-white ring-1 ring-gray-200/80 hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <div className="aspect-square rounded-full flex items-center justify-center h-[40px] border-2 border-white overflow-hidden text-white text-center text-xl bg-gradient-to-br from-primaryBlue to-primaryBlueDarker shadow-[0_8px_18px_-12px_rgba(0,110,182,0.6)]">
                    {initials}
                  </div>
                  <div className="font-normal text-gray-700">
                    {session?.name}
                  </div>
                </Link>

                <div className="border-t border-gray-200/70 pt-3 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`relative flex items-center gap-2 cursor-pointer rounded-xl px-3 py-2 transition duration-200 ease-in-out ${
                        isActiveLink(item.href)
                          ? "bg-primaryBlue/10 text-primaryBlue font-semibold before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-primaryBlue"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer rounded-xl p-3 bg-primaryRed/10 hover:bg-primaryRed/15 transition duration-200 ease-in-out text-primaryRed font-semibold"
                >
                  Keluar
                </button>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
  );
}
