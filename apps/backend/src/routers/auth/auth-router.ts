import { publicProcedure, router } from "../../trpc";
import prisma from "@workspace/db/prisma";
import { TRPCError } from "@trpc/server";

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
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User with email already exists."
          })
        }

        return { message: "OK", status: 200 };
      } catch (error) {

        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong. Please try again later."
        })
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
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User with this email doesn't exist"
          })
        }

        return { message: "OK", status: 200 };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong. Please try again later."
        })
      }
    }),
});
