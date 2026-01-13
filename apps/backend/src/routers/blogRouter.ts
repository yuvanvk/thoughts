import * as z from "zod";
import prisma from "@workspace/db/prisma";

import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const blogRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(5).max(100),
        description: z.string(),
        image: z.string().nullable().optional(),
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
    get: publicProcedure
      .input(z.object({
        id: z.string()
      }))
      .query(async (opts) => {
        try {
          if(!opts.ctx.session?.session) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Please login to proceed."
            })
          }
  
          const blog = await prisma.blog.findUnique({
            where: {
              id: opts.input.id
            }
          })

          if(!blog) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Blog does not exist."
            })
          }

          return { message: "OK", status: 200, blog }
        } catch (error) {
          if(error instanceof TRPCError) {
            throw error
          }
          throw new TRPCError({
            code: "BAD_GATEWAY",
            message: "Something went wrong"
          })
        }
      }),
      getUserBlogs: publicProcedure
      .query(async (opts) => {
        try {
          if(!opts.ctx.session?.session) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Please login to proceed"
            })
          }

          const blogs = await prisma.blog.findMany({
            where: {
              userId: opts.ctx.session.user.id
            }
          })

          return { message: "OK", status: 200, blogs }
        } catch (error) {
            if(error instanceof TRPCError) {
              throw error
            }

            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Something went wrong"
            })
        }
      })
});
