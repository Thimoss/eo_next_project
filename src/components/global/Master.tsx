import React from "react";

interface MasterProps {
  children: React.ReactNode;
}

export default function Master({ children }: MasterProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-white py-5 sticky top-0 drop-shadow-md z-10">
        <div className="container mx-auto">Tes</div>
      </header>
      <main className="w-full  flex-1 py-5 bg-gray-200">
        <div className="container mx-auto">{children}</div>
      </main>
      <footer className="w-full bg-white py-5 drop-shadow-md">
        <div className="container mx-auto text-center">EO</div>
      </footer>
    </div>
  );
}
