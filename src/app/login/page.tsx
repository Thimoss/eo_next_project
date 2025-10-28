// "use client";
// import React, { useEffect, useState } from "react";

// import { useAppDispatch, useAppSelector } from "../../../service/store";
// import { login, validateUser } from "../../../service/authActions";
// import { useRouter } from "next/navigation";

// // Import Action, Method & Reducers
// // import { useAppSelector, useAppDispatch } from "../redux/store";
// // import { login, validateUser } from "../redux/actions/authActions";

// const Login: React.FC = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [token, setToken] = useState<string | null>(null);

//   const isAuthenticated = useAppSelector(
//     (state) => state?.auth?.isAuthenticated ?? false
//   );
//   const isAuthenticating = useAppSelector(
//     (state) => state?.auth?.isAuthenticating ?? true
//   );
//   const actionMessage = useAppSelector(
//     (state) => state?.auth?.message ?? { type: null, message: null }
//   );

//   console.log(isAuthenticated);

//   // On Load Validate User by Token
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       dispatch(validateUser(token));
//     }
//   }, [dispatch]);

//   // On Submit
//   const _onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const form = e.target as HTMLFormElement;
//     const email = (form.email as HTMLInputElement).value;
//     const password = (form.password as HTMLInputElement).value;

//     // Dispatch login action
//     dispatch(login({ email, password }));

//     setTimeout(() => {
//       if (actionMessage?.type === "error") {
//         alert(actionMessage?.message || "Login failed");
//       }
//     }, 500);
//   };

//   return (
//     <div>
//       <h2>Sign in</h2>

//       <p>{token ? "Token ditemukan!" : "Token tidak ditemukan!"}</p>
//       <form onSubmit={_onSubmit}>
//         {/* Email */}
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" required />
//         </div>

//         {/* Password */}
//         <div>
//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" name="password" required />
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button type="submit">Sign In</button>
//         </div>
//       </form>

//       <div>
//         <p>
//           Dont have an account? <a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <LoginForm />
    </div>
  );
};

export default Login;
