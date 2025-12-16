"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

import { Command, CommandInput } from "@workspace/ui/components/command";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";

export const Appbar = () => {
  const router = useRouter();

  return (
    <div className="fixed w-full border-b z-50 bg-black ">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-1.5 py-2">
        <div onClick={() => router.push("/home")} className="cursor-pointer">
          <Logo />
        </div>

        <div className="flex items-center gap-x-4">
          <Command className="rounded-none  bg-[#121212] border w-80">
            <CommandInput placeholder="Search" />
          </Command>
          <div
            onClick={() => router.push("/settings")}
            className="flex items-center gap-x-3 cursor-pointer"
          >
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="!rounded-none">
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="text-[11px]">View Profile</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
