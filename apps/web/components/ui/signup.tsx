"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";

import { ArrowRight, Asterisk } from "lucide-react";
import { useTRPC } from "@/lib/trpc";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUp = () => {
  const trpc = useTRPC();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const router = useRouter();

  const createUser = useMutation(trpc.auth.signUp.mutationOptions({
    onSuccess: () => {
      toast.success("User created successfully.")
      router.push("/home");
    },
    onError: () => {
      toast.error("Something went wrong")
    }
  }));

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto border-x h-screen">
        <div className="px-20 py-36 flex flex-col space-y-4">
          <h1 className="font-medium text-5xl max-w-2xl tracking-tighter">
            Be part of Thoughts. Share what matters to you.
          </h1>
          <p className="text-[#A0A0A0] font-mono text-sm">
            Already signed up?{" "}
            <Link className="underline " href={"/login"}>
              Log in
            </Link>
          </p>

          <div className="my-5 flex flex-col space-y-6">
            <div className="flex items-center gap-x-4">
              <div className="bg-[#333333] px-1.5 py-1">
                <Asterisk size={20} />
              </div>
              <div className="text-3xl font-medium tracking-tight">
                Enter your details to proceed
              </div>
            </div>

            <div className="flex items-center gap-x-4 w-full">
              <div className="space-y-3 w-full">
                <Label
                  htmlFor="firstname"
                  className="uppercase font-light font-mono text-[#A0A0A0]"
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
                  className="font-sans uppercase !bg-black !px-4 !py-6 min-w-1/2"
                />
              </div>

              <div className="space-y-3 w-full">
                <Label
                  htmlFor="lastname"
                  className="uppercase font-light font-mono text-[#A0A0A0]"
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
                  className="font-sans uppercase !bg-black !px-4 !py-6 min-w-1/2"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="uppercase font-light font-mono text-[#A0A0A0]"
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
                className="font-sans uppercase !bg-black !px-4 !py-6 "
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="uppercase font-light font-mono text-[#A0A0A0]"
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
                className="font-sans uppercase !bg-black !px-4 !py-6 "
              />
            </div>

            <button
              onClick={async () => {
                                
                await createUser.mutateAsync({
                  firstName: userDetails.firstName,
                  lastName: userDetails.lastName,
                  password: userDetails.password,
                  email: userDetails.email,
                })
              }}
              type="submit"
              className="px-6 py-4 flex items-center justify-between bg-[#333333] hover:bg-neutral-800 transition mt-4 cursor-pointer"
            >
              <div className="font-mono font-medium">Signup</div>
              <div className="bg-white px-3 py-2">
                <ArrowRight className="text-black" size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
