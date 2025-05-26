import { TRPCError } from "@trpc/server";
import { initTRPC } from "@trpc/server";
import { createTRPCContext } from "../context"; // make sure this matches
import { prisma } from "../db";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson, // Add the transformer here
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      prisma,
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});
