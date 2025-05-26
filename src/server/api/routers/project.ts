import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    console.log("print");

    return prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: publicProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("Received input:", input);

      try {
        const project = await ctx.prisma.project.create({
          data: {
            name: input.name,
            description: input.description,
          },
        });

        console.log("Created project:", project);
        return project;
      } catch (error) {
        console.error("Error creating project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
          cause: error,
        });
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      return prisma.project.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.project.delete({ where: { id: input.id } });
    }),
});
