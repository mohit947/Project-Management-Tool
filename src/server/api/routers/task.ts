import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  deadline: z.string().optional(),
  assigneeId: z.string(),
  projectId: z.string(),
  status: z.string().default("todo"),
});
export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.task.findMany({
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  create: publicProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("Create task input:", input);
      return await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          priority: input.priority,
          deadline: input.deadline ? new Date(input.deadline) : null,
          assigneeId: input.assigneeId,
          projectId: input.projectId,
          status: input.status,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        priority: z.enum(["low", "medium", "high"]),
        deadline: z.string().optional().nullable(),
        assigneeId: z.string().nullable(),
        projectId: z.string(),
        status: z.enum(["todo", "in-progress", "done"]),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.task.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          priority: input.priority,
          deadline: input.deadline ? new Date(input.deadline) : null,
          assigneeId: input.assigneeId,
          projectId: input.projectId,
          status: input.status,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.task.delete({
        where: { id: input.id },
      });
    }),
});
