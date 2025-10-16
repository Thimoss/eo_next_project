import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MasterProps {
  children: React.ReactNode;
}

export default function Master({ children }: MasterProps) {
  return (
    <div className="min-h-screen flex flex-col">
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
              <Link href={"/"}>Dasboard</Link>
            </div>
            <div className="text-black hover:text-primaryBlue text-sm hover:underline font-semibold">
              <Link href={"/list-category"}>Kategori</Link>
            </div>
          </div>
          {/* <div>
            <div className="flex items-center gap-2 text-xs">
              <h1 className="text-xs font-normal">User Example</h1>

              <div className="aspect-square rounded-full flex items-center justify-center h-[37px] border-2 border-primaryBlue overflow-hidden">
                <Image
                  draggable={false}
                  src="https://picsum.photos/37/37"
                  alt="Avatar"
                  width={37}
                  height={37}
                />
              </div>
            </div>
          </div> */}
        </div>
      </header>
      <main className="w-full  flex-1 py-5 bg-gray-200">
        <div className="container mx-auto px-4 md:px-0">{children}</div>
      </main>
      <footer className="w-full bg-white py-2">
        <div className="container mx-auto px-4 md:px-0 text-center text-xs">
          © 2025 Pertamina. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
