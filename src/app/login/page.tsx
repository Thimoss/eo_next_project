import LoginForm from "@/components/login/LoginForm";
import { getSession } from "../../../lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <LoginForm />
    </div>
  );
}
