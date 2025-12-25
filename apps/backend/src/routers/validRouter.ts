import { publicProcedure, router } from "../trpc";
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
        return { message: "Unauthorized", status: "401", preSignedUrl: null };
      }
      const { size, type, name } = opts.input;

      const maxSizeMb = 5 * 1024 * 1024;
      if (size > maxSizeMb || !type.startsWith("image/")) {
        return { message: "Not a valid format", status: "402", preSignedUrl: null };
      }

      const preSignedUrl = `public/${opts.ctx.session.session.userId}/${Date.now()}/${name}`
      return {
        message: "OK",
        status: "200",
        preSignedUrl
      };
    }),
});
