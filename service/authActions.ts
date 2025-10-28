// authActions.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setIsAuthenticated,
  setIsAuthenticating,
  setMessage,
  setToken,
  setUser,
} from "./authReducer";
import { ApiUrl } from "../config/app";
import { cookies } from "next/headers";

// Tipe untuk data user
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface LoginUser {
  email: string;
  password: string;
}

// Login Action
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, { dispatch }) => {
    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true));

    try {
      const response = await fetch(`${ApiUrl}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Mencetak response dalam bentuk JSON
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        throw new Error("Failed to authenticate user.");
      }

      // Jika data atau token tidak ada
      if (!responseData?.access_token) {
        throw new Error("Token Not Found");
      }
      const token = responseData.access_token;

      // Validasi User dengan Token
      dispatch(validateUser(token));
    } catch (err: any) {
      // Dispatch `authReducer` Values to Redux Store
      dispatch(setIsAuthenticated(false));
      dispatch(setToken(null));
      dispatch(setUser({}));
      dispatch(
        setMessage({ type: "error", message: err?.message || "Login failed" })
      );

      // Set Is Authenticating `false`
      dispatch(setIsAuthenticating(false));
    }
  }
);

export const validateUser = createAsyncThunk(
  "auth/validateUser",
  async (token: string, { dispatch }) => {
    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true));

    try {
      // If Token Doesn't Exist
      if (!token) {
        throw new Error("User Not Found");
      }

      const response = await fetch(`${ApiUrl}auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      // Periksa apakah data user ada
      if (!data?.data) {
        throw new Error("User Not Found");
      }

      const user: User = data.data;

      const cookieStore = await cookies();

      // Simpan `token` & `user` ke cookies
      cookieStore.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      cookieStore.set("user", JSON.stringify(user), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      // Dispatch `authReducer` Values to Redux Store
      dispatch(setIsAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setUser(user));

      // Set Is Authenticating `false`
      dispatch(setIsAuthenticating(false));
    } catch (err: any) {
      console.error(err);

      // Dispatch `authReducer` Values to Redux Store
      dispatch(setIsAuthenticated(false));
      dispatch(setToken(null));
      dispatch(setUser({}));

      // Set Is Authenticating `false`
      dispatch(setIsAuthenticating(false));
    }
  }
);

// Logout Action
export const logout = createAsyncThunk(
  "auth/logout",
  async (e, { dispatch }) => {
    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true));

    // Clear localStorage
    // const getCookies = await cookies();
    // getCookies.delete([]);

    // Dispatch `authReducer` Values to Redux Store
    dispatch(setIsAuthenticated(false));
    dispatch(setToken(null));
    dispatch(setUser({}));

    // Set Is Authenticating `false`
    dispatch(setIsAuthenticating(false));
  }
);
