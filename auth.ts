import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    name: {
      label: "User Name",
    },
    email: {
      label: "Email",
      type: "email",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },

  async authorize(credentials: any) {
    const { name, email, password, isLogin } = credentials;
    const user = await db.user.findUnique({
      where: { email },
    });

    if (isLogin === "false" && !user) {
      const result = await db.user.create({
        data: { name, email, password },
      });

      if (result) return result;
      return null;
    } else if (user && user?.password === password) {
      return user;
    } else return null;
  },
});
const config: NextAuthConfig = {
  providers: [Google, credentialsConfig],
  secret: process.env.SECRET,
  // **Production:**
 trustHost: true,

};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
