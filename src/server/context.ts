import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth"; // Adjust path if needed
import { prisma } from "@/server/db"; // your PrismaClient import
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createTRPCContext = async ({
  req,
  res,
}: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    session,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
