// import { LoginForm } from "@/components/login/LoginForm";

// import { cookies } from "next/headers";
// import { SavedSession } from "../../../types/Session.type";

// export default async function LoginPage() {
//   const cookieStore = await cookies();
//   const rawSessionData = cookieStore.get("session")?.value;

//   const session = rawSessionData
//     ? (JSON.parse(rawSessionData) as SavedSession)
//     : undefined;

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <LoginForm />
//     </div>
//   );
// }

import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <LoginForm />
    </div>
  );
};

export default Login;
