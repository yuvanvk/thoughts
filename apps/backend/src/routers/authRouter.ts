import { publicProcedure, router } from "../trpc";
import bcrypt from "bcrypt";
import prisma from "@workspace/db/prisma";

import * as z from "zod";

export const authRouter = router({
    signUp: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(5),
                firstName: z.string(),
                lastName: z.string(),
            })
        )
        .output(z.boolean())
        .mutation(async (opts) => {
            try {
               const { email, password, firstName, lastName }  = opts.input;

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email,
                        password,
                    },
                });

                if (existingUser) {
                    return false;
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                await prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        firstName,
                        lastName,
                    },
                });

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }),
    login: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(5),
            })
        )
        .output(z.boolean())
        .query(async (opts) => {
            try {
               const { email, password } = opts.input;
               
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    }
                });

                if(!user) {
                    return false;
                }

                const isValidPassword = await bcrypt.compare(password, user?.password)
                if(!isValidPassword) return false;

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }),
});
