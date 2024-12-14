import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
  }
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    name: string;
    email: string;
    exp?: number;
  }
}
