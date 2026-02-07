"use client";

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@workspace/ui/components/card";

import { authClient } from "@/lib/better-auth/auth-client";
authClient;
export const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const trpc = useTRPC();
  const router = useRouter();

  const login = useMutation(trpc.auth.login.mutationOptions());

  return (
    <div className="py-40">
      <div className="flex flex-col">
        <h1 className="font-medium text-4xl text-center font-serif text-neutral-500">
          Welcome back!
        </h1>
        <h2 className="text-4xl font-medium text-center font-serif">
          Login to your account.
        </h2>

        <Card className="bg-neutral-900 rounded-[10px] max-w-sm mx-auto w-full mt-5 dark:border-neutral-700">
          <CardContent>
            <div className="my-5 flex flex-col space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="capitalize font-medium font-sans text-white"
                >
                  email
                </Label>
                <Input
                  onChange={(e) => {
                    setLoginDetails({
                      ...loginDetails,
                      email: e.target.value,
                    });
                  }}
                  placeholder="yuvanvk@gmail.com"
                  className="font-sans rounded-[10px] bg-neutral-800! border-neutral-700"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="capitalize font-medium font-sans text-white"
                >
                  password
                </Label>
                <Input
                  onChange={(e) => {
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    });
                  }}
                  type="password"
                  placeholder=""
                  className="font-sans rounded-[10px] bg-neutral-800! border-neutral-700"
                />
              </div>

              <button
                onClick={async () => {
                  const reponse = await login.mutateAsync({
                    email: loginDetails.email,
                    password: loginDetails.password,
                  });

                  if (reponse.status !== 200) {
                    toast.error(reponse.message);
                  }

                  if (reponse.status === 200) {
                    await authClient.signIn.email(
                      {
                        email: loginDetails.email,
                        password: loginDetails.password,
                        rememberMe: true,
                        callbackURL: "http://localhost:3000/home",
                      },
                      {
                        onError: async (ctx) => {
                          if (ctx.error.status === 403) {
                            toast.error("Please verify your email address");

                            await authClient.sendVerificationEmail(
                              {
                                email: loginDetails.email,
                              },
                              {
                                onSuccess: () => {
                                  toast.success("Verification email sent");
                                },
                              },
                            );
                          }
                        },
                      },
                    );
                  }
                }}
                className="px-2 py-2 flex justify-center items-center gap-x-2 bg-[#121212] dark:bg-white dark:text-black  mt-4 cursor-pointer w-full border rounded-[18px]"
              >
                <div className="font-sans font-medium">Login</div>
                <div>
                  <ArrowRight size={20} />
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-neutral-400 text-sm text-center font-medium font-sans mt-10">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="hover:underline hover:text-white cursor-pointer"
          >
            Create one!
          </span>
        </p>
      </div>
    </div>
  );
};
