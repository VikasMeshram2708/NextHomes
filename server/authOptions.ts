import { db } from "@/db";
import { user } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Type Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const emailExist = await db.query.user.findFirst({
          where: eq(user?.email, credentials?.email),
        });

        if (!emailExist) {
          throw new Error("User Doesn't Exist");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          emailExist.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid Credentials");
        }
        return {
          id: emailExist.id,
          name: emailExist.name,
          email: emailExist.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/sign-up",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = +user.id;
        token.email = user.email;
        token.name = user.name;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
};
