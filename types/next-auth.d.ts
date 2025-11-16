import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"];
    userId?: string;
    photoKey?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    photoKey?: string | null;
  }
}


