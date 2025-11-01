
import { publicProcedure, router } from "../trpc";
import * as z from "zod";

export const blogRouter = router({
    create: publicProcedure
        .input(z.object({
            title: z.string().min(5).max(100),
            description: z.string()
        }))
        .mutation(async (opts) => {
            const title = opts.input.title;
            const description = opts.input.description;

                        
        })
})