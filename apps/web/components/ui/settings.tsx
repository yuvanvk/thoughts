"use client";

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useRouter } from "next/navigation";

export const Settings = () => {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto border-x h-screen">
      <div className="px-16 py-4 flex flex-col">
        <div className="space-y-3">
          <div className="text-5xl font-medium font-sans">Settings</div>
          <div className="text-sm text-neutral-400 font-normal font-mono">
            Manage your account and preferences
          </div>
          <div className="my-10 space-y-10">
            <div className="space-y-3">
              <Label
                htmlFor="firstname"
                className="uppercase font-light font-mono text-[#A0A0A0]"
              >
                First Name
              </Label>
              <Input
                placeholder="Yuvan"
                className="font-sans uppercase !bg-black !px-4 !py-6"
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="lastname"
                className="uppercase font-light font-mono text-[#A0A0A0]"
              >
                Last name
              </Label>
              <Input
              
                placeholder="Kappala"
                className="font-sans uppercase !bg-black !px-4 !py-6"
              />
              
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="uppercase font-light font-mono text-[#A0A0A0]"
              >
                email
              </Label>
              <Input
                disabled
                value={"abhivigneshofficial@gmail.com"}
                className="font-sans uppercase !bg-black !px-4 !py-6"
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="uppercase font-light font-mono text-[#A0A0A0]"
              >
                Password
              </Label>
              <Input
                placeholder="*****"
                className="font-sans uppercase !bg-black !px-4 !py-6"
              />
              <div className="text-right underline text-sm font-mono text-neutral-400 cursor-pointer">Change password</div>
            </div>

            <div className="flex items-center justify-between font-mono text-sm">
                <button onClick={() => router.push("/home")} className="bg-[#121212] px-5 py-2 border cursor-pointer">
                    Cancel
                </button>
                <button className="bg-white text-black px-5 py-2 border">
                    Save
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
