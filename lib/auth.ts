import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SavedSession } from "../types/Session.type";

export async function getSession(): Promise<SavedSession | null> {
  const cookieStore = await cookies();
  const rawSessionData = cookieStore.get("session")?.value;

  if (!rawSessionData) {
    return null;
  }

  try {
    const session = JSON.parse(rawSessionData) as SavedSession;

    if (session.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (session.exp < now) {
        cookieStore.delete("session");
        return null;
      }
    }

    return session;
  } catch (e) {
    console.error("Failed to parse session cookie:", e);
    cookieStore.delete("session");
    return null;
  }
}

export async function requireSession(): Promise<SavedSession> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
