import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtPayload, UserSession } from "../types/Session.type";
import Api from "../service/Api";

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const parts = accessToken.split(".");
    if (parts.length !== 3) {
      console.error("Token tidak valid");
      cookieStore.delete("accessToken");
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    ) as JwtPayload;

    if (payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        cookieStore.delete("accessToken");
        return null;
      }
    }

    const apiGet = new Api();
    apiGet.auth = true;
    apiGet.token = accessToken;
    apiGet.method = "GET";
    apiGet.url = "auth/profile";

    const res = await apiGet.call();

    if (res.statusCode !== 200) {
      throw new Error(res.message ?? "Gagal mengambil profil user");
    }

    return res.data;
  } catch (e) {
    console.error("Failed to parse session cookie:", e);
    cookieStore.delete("accessToken");
    return null;
  }
}

export async function requireSession(): Promise<UserSession> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
