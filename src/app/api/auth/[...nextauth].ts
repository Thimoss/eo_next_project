/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { ApiUrl } from "../../../../config/app";

const options: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${ApiUrl}auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }

          const { access_token, user } = data;

          if (access_token && user) {
            return {
              id: user.id,
              email: user.email,
              role: user.role,
              accessToken: access_token,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.role = user.role;
        token.accessTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
      }

      if (
        token.accessTokenExpiry &&
        Date.now() > token.accessTokenExpiry - 60000
      ) {
        return {};
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
      };
      session.accessToken = token.accessToken;

      if (token.accessToken) {
        try {
          const profileResponse = await fetch(ApiUrl + "auth/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (!profileResponse.ok) {
            throw new Error(
              `Failed to fetch profile: ${profileResponse.statusText}`
            );
          }

          const profileData = await profileResponse.json();

          if (profileData && profileData.data) {
            session.user = {
              ...session.user,
              ...profileData.data,
            };
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        session = null; // Clear session if no accessToken
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default NextAuth(options);
