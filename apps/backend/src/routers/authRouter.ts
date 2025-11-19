import { publicProcedure, router } from "../trpc";
import bcrypt from "bcrypt";
import prisma from "@workspace/db/prisma";

import * as z from "zod";
import { auth } from "@workspace/auth/better-auth";

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
                    return { message: "User already exists", status: 411 };
                }

                const data = await auth.api.signUpEmail({
                    body: {
                        name: `${firstName} ${lastName}`,
                        email,
                        password,
                        callbackURL: "http://localhost:3000/home"
                    }
                })

                return { message: "User created successfully", status: 200 };
            } catch (error) {
                console.log(error);
                return { message: "Something went wrong. Please try again later", status: 500 };
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
