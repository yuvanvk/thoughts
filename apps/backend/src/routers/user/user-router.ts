import * as z from "zod";
import prisma from "@workspace/db/prisma";

import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
    save: publicProcedure
    .input(z.object({
        imageUrl: z.string().optional(),
        password: z.string().optional()
    }))
    .mutation(async (opts) => {
        try {
            if(!opts.ctx.session?.session) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Please login to proceed"
                })
            }


            await prisma.user.update({
                where: {
                    id: opts.ctx.session.session.userId
                },
                data: {
                    image: opts.input.imageUrl
                }
            })

            return { message: "Saved", status: 200 }
        } catch (error) {
            if(error instanceof TRPCError) {
                throw error
            }

            throw new TRPCError({
                code: "BAD_GATEWAY",
                message: "Something went wrong"
            })
        }
    })
})