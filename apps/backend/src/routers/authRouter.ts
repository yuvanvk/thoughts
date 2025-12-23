import { publicProcedure, router } from "../trpc";
import prisma from "@workspace/db/prisma";

import * as z from "zod";

export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { email } = opts.input;

        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (existingUser) {
          return { message: "User already exists", status: 411 };
        }

        return { message: "OK", status: 200 };
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
    .mutation(async (opts) => {
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

        return { message: "OK", status: 200 };
      } catch (error) {
        console.log(error);
        return {
          message: "Something went wrong. Please try again later",
          status: 500,
        };
      }
    }),
});
