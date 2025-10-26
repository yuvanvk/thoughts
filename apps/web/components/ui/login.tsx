"use client"

import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { ArrowRight, Asterisk } from "lucide-react"
import Link from "next/link"

export const Login = () => {

    return (
      <div className="max-w-4xl mx-auto border h-screen">
      <div className="px-20 py-36 flex flex-col space-y-4">
        <h1 className="font-medium text-5xl max-w-2xl tracking-tighter">
          Welcome back to Thoughts
        </h1>
        <p className="text-[#A0A0A0] font-mono text-sm">
          Don't have an account?{" "}
          <Link className="underline " href={"/signup"}>
            Sign up
          </Link>
        </p>

        <div className="my-5 flex flex-col space-y-6">
          <div className="flex items-center gap-x-4">
            <div className="bg-[#333333] px-1.5 py-1">
              <Asterisk size={20} />
            </div>
            <div className="text-3xl font-medium tracking-tight">
              Enter your credentails to proceed
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
              type="password"
                placeholder=""
                className="font-sans uppercase !bg-black !px-4 !py-6 "
              />
          </div>

          <button className="px-6 py-4 flex justify-between items-center gap-x-3 bg-[#121212]  mt-4 cursor-pointer w-full border">
            <div className="font-mono font-medium">Log In</div>
            <div className="bg-white px-3 py-2">
                <ArrowRight className="text-black" size={20}/>
            </div>
          </button>
        </div>
      </div>
    </div>
    )
}