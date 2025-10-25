import prisma from "@workspace/db/prisma";
import { publicProcedure, router } from "../trpc";

import * as z from "zod"; 


export const authRouter = router({
    signUp: publicProcedure
    .input(z.object({
        email: z.string().email(),
        password: z.string().min(5)
    }))
    .mutation(async (opts) => {
        const email = opts.input.email;
        const password = opts.input.password;

       
        
    })
})


