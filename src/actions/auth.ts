"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Api from "../../service/Api";
import { JwtPayload } from "../../types/Session.type";

type LoginFormState = {
  error?: string;
  success?: string;
};

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi" };
  }

  try {
    const api = new Api();
    api.method = "POST";
    api.url = "auth/login";
    api.body = { email, password };
    const response = await api.call();

    if (response.statusCode !== 200) {
      return { error: response.message ?? "Login gagal" };
    }

    const accessToken = response.access_token as string | undefined;

    if (!accessToken) {
      console.error("Gagal menerima token dari server.");
      return {};
    }

    const parts = accessToken.split(".");
    if (parts.length !== 3) {
      console.error("Token tidak valid");
      return {};
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    ) as JwtPayload;

    const maxAge =
      payload.exp && payload.iat && payload.exp > payload.iat
        ? payload.exp - payload.iat
        : undefined;

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      ...(maxAge ? { maxAge } : {}),
    });

    return { success: response.message ?? "Login berhasil" };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Terjadi kesalahan, silakan coba lagi" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login");
}
