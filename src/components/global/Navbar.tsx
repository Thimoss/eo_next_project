"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserSession } from "../../../types/Session.type";

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

  return (
    <header className="w-full bg-white py-5 sticky top-0 z-50 shadow-sm ">
      <div className="container mx-auto px-4 md:px-0 flex items-center justify-between">
        <div className="flex items-center gap-10">
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
          <div className="text-black hover:text-primaryBlue text-sm hover:underline font-semibold">
            <Link href={"/"}>Dashboard</Link>
          </div>
          <div className="text-black hover:text-primaryBlue text-sm hover:underline font-semibold">
            <Link href={"/list-category"}>Kategori</Link>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs">
            <h1 className="text-sm font-normal text-gray-700">
              {session?.name}
            </h1>

            <div className="relative">
              <div
                // ref={avatarRef}
                // onClick={toggleMenu}
                className="aspect-square bg-primaryBlue rounded-full flex items-center justify-center h-[40px] border-2 border-primaryBlueLighter overflow-hidden cursor-pointer text-white text-center text-xl"
              >
                {initials}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
// const [isOpen, setIsOpen] = useState(false);

// const dropdownRef = useRef(null);
// const avatarRef = useRef(null);

// const toggleMenu = () => {
//   setIsOpen(!isOpen);
// };

// const handleLogout = () => {};

// const handleProfile = () => {};

// useEffect(() => {
//   const handleClickOutside = (e) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(e.target) &&
//       avatarRef.current &&
//       !avatarRef.current.contains(e.target)
//     ) {
//       setIsOpen(false);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);
{
  /* <div
                ref={dropdownRef} // Referensi untuk menu dropdown
                className={`absolute bg-white text-sm font-semibold px-4 py-2 right-0 shadow-sm rounded-md space-y-1 text-left w-40 transition-all duration-500 ease-in-out transform ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                <div
                  className="px-4 py-2 cursor-pointer transition duration-300 hover:bg-gray-100 rounded-md"
                  onClick={handleProfile} // Menangani klik pada "Profil"
                >
                  Profil
                </div>
                <div
                  className="px-4 text-primaryRed py-2 cursor-pointer transition duration-300 hover:bg-gray-100 rounded-md"
                  onClick={handleLogout} // Menangani klik pada "Logout"
                >
                  Logout
                </div>
              </div> */
}
