import * as z from "zod";
import prisma from "@workspace/db/prisma";

import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const searchRouter = router({
  keyword: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async (opts) => {
      try {
        if (!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed",
          });
        }

        const { query } = opts.input;

        const results = await prisma.blog.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
            status: "PUBLISHED",
          },
        });

        return { message: "OK", status: 200, results };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong",
        });
      }
    }),
});
