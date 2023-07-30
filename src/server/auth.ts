import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";


import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties like: role: UserRole;
    } & DefaultSession["user"];
  }
  // interface User { role: UserRole }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // GitHub provider requires you to add the `refresh_token_expires_in` field to the Account model
  ],
};

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // try {
  //   return await getServerSession(ctx.req, ctx.res, authOptions);
  // } catch (error) {
  //   console.error("Error occurred in getServerAuthSession:", error);
  //   throw error;
  // }
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export async function isUserAuthenticated(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  try {
    const session = await getServerAuthSession(ctx);
    console.log("auth session: " + session)

    return !!session?.user?.id;
  } catch (error) {
    console.error("Error occurred in isUserAuthenticated:", error);
    return false;
  }
}