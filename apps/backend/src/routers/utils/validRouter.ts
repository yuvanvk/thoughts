import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../../trpc";
import * as z from "zod";

export const validRouter = router({
  create: publicProcedure
    .input(
      z.object({
        size: z.number(),
        type: z.string(),
        name: z.string(),
      })
    )
    .mutation(async (opts) => {
      if (!opts.ctx.session?.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login to proceed"
        })
      }
      const { size, type, name } = opts.input;

      const maxSizeMb = 5 * 1024 * 1024;
      if (size > maxSizeMb || !type.startsWith("image/")) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Invalid data.",
          cause: "Provided image is above 5MB or not a supported image type."
        })
      }

      const preSignedUrl = `public/${opts.ctx.session.session.userId}/${Date.now()}/${name}`
      return {
        message: "OK",
        status: 200,
        preSignedUrl
      };
    }),
});
