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
        password: z.string().min(8),
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { email, password, firstName, lastName } = opts.input;

        const existingUser = await prisma.user.findUnique({
          where: {
            email,
            password,
          },
        });

        if (existingUser) {
          return { message: "User already exists", status: 411 };
        }

        await auth.api.signUpEmail({
          body: {
            name: `${firstName} ${lastName}`,
            email,
            password,
            callbackURL: "http://localhost:3000/home",
          },
        });

        return { message: "User created successfully", status: 200 };
      } catch (error) {
        console.log(error);
        return {
          message: "Something went wrong. Please try again later",
          status: 500,
        };
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(5),
      })
    )
    .query(async (opts) => {
      try {
        const { email, password } = opts.input;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return { message: "User does not exist", status: 404 };
        }

        const data = await auth.api.signInEmail({
          body: {
            email,
            password,
            rememberMe: true,
            callbackURL: "http://localhost:3000/home",
          },
        });

        return { message: "Logged In successfully", status: 200 };
      } catch (error) {
        console.log(error);
        return false;
      }
    }),
});
