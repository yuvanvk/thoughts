"use client";

import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";

import { ArrowRight } from "lucide-react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/better-auth/auth-client";
import { Card, CardContent } from "@workspace/ui/components/card";

export const SignUp = () => {
  const trpc = useTRPC();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const createUser = useMutation(
    trpc.auth.signUp.mutationOptions({
      onSuccess: () => {
        toast.success("User created successfully.");
        router.push("/home");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    })
  );

  return (
    <div className="w-full py-30">
      <div className="w-full">
        <div className="flex flex-col w-full space-y-6">
          <h1 className="font-medium text-[40px] font-serif text-center">
            Sign up & create your profile.
          </h1>

          <Card className="rounded-[10px] bg-neutral-900 max-w-sm mx-auto w-full">
            <CardContent className="space-y-4">
              <div className="space-y-3 w-full">
                <Label
                  htmlFor="firstname"
                  className="capitalize font-medium font-sans text-white"
                >
                  first name
                </Label>
                <Input
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="Yuvan"
                  className="font-sans bg-neutral-800 border-neutral-700 rounded-[10px]"
                />
              </div>
              <div className="space-y-3 w-full">
                <Label
                  htmlFor="lastname"
                  className="capitalize font-medium font-sans text-white"
                >
                  last name
                </Label>
                <Input
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="kappala"
                  className="font-sans bg-neutral-800 border-neutral-700 rounded-[10px]"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="capitalize font-medium font-sans text-white"
                >
                  email
                </Label>
                <Input
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    })
                  }
                  placeholder="yuvanvk@gmail.com"
                  className="font-sans bg-neutral-800 border-neutral-700 rounded-[10px] "
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="capitalize font-medium font-sans text-white"
                >
                  password
                </Label>
                <Input
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                  type="password"
                  placeholder=""
                  className="font-sans bg-neutral-800 border-neutral-700 rounded-[10px]"
                />
              </div>

              <button
                onClick={async () => {
                  const response = await createUser.mutateAsync({
                    email: userDetails.email,
                  });

                  if (response.status !== 200) {
                    toast.error(response.message);
                  }

                  if (response.status === 200) {
                    await authClient.signUp.email({
                      name: `${userDetails.firstName} ${userDetails.lastName}`,
                      email: userDetails.email,
                      password: userDetails.password,
                      callbackURL: "http://localhost:3000/home",
                    });
                  }
                }}
                type="submit"
                className="px-3 py-2 flex items-center justify-center gap-x-2 bg-[#333333] dark:bg-white dark:text-black hover:bg-neutral-800 transition mt-5 cursor-pointer w-full rounded-[15px]"
              >
                <div className="font-sans font-medium">Create Profile</div>
                <ArrowRight size={20} />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
