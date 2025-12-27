import prisma from "@workspace/db/prisma";
import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import { TRPCError } from "@trpc/server";

export const blogRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(5).max(100),
        description: z.string(),
        image: z.string().or(z.null()),
      })
    )
    .mutation(async (opts) => {
      try {
        const title = opts.input.title;
        const description = opts.input.description;
        const image = opts.input.image;

        if (!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed.",
          });
        }

        await prisma.blog.create({
          data: {
            title,
            description,
            imageUrl: image,
            userId: opts.ctx.session.session.userId,
          },
        });

        return { message: "Blog created Successfully", status: 200 };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong. Please try again later."
        })
      }
    }),
});
