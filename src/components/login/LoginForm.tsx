/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // Kirimkan kredensial ke NextAuth.js untuk login
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log("Login Result:", result);

    // Cek apakah login berhasil
    if (result?.error) {
      setError("Invalid email or password");
      toast.error(error);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-sm w-full flex flex-col gap-5">
      <div className="flex flex-col items-center gap-6">
        <Image
          draggable={false}
          src="/logo_1.png"
          alt="Pertamina Logo"
          width={160}
          height={37}
        />
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Selamat Datang
          </h2>
          <p className="text-center text-base font-normal text-gray-500">
            Masuk untuk melanjutkan
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Alamat Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Kata Sandi
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            placeholder="******"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-primaryBlue text-white font-bold rounded-md hover:bg-primaryBlueDarker transition duration-300 ease-in-out cursor-pointer"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
