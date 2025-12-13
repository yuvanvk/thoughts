import prisma from "@workspace/db/prisma";
import { publicProcedure, router } from "../trpc";
import * as z from "zod";

export const blogRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(5).max(100),
        description: z.string(),
        image: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const title = opts.input.title;
      const description = opts.input.description;
      const image = opts.input.image;

      if (!opts.ctx.session?.session) {
        return { message: "Unauthorized", status: 401 };
      }
      const blog = await prisma.blog.create({
        data: {
          title,
          description,
          imageUrl: image,
          userId: opts.ctx.session.session.userId,
        },
      });

      return { message: "Blog created Successfully", status: 200 };
    }),
});
