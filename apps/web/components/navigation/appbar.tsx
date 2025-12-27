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

import { useRouter } from "next/navigation";
import { Logo } from "@/components/branding/logo";
import { useMobile } from "@/hooks/useMobile";
import { MenuIcon, Search } from "lucide-react";
import { Input } from "@workspace/ui/components/input";

export const Appbar = () => {
  const router = useRouter();
  const isMobile = useMobile();

  return (
    <div className="fixed w-full z-50 backdrop-blur-3xl">
      <div className="w-full xl:max-w-6xl mx-auto flex items-center justify-between px-3 xl:px-4 py-2">
        <div onClick={() => router.push("/home")} className="cursor-pointer">
          <Logo />
        </div>

        <div className="flex items-center bg-neutral-950 px-2 border rounded-[10px] w-[400px]">
          <Search size={20} className="text-neutral-600" />
          <Input
            placeholder="Search"
            className="border-none !bg-transparent focus:ring-0 outline-none focus-visible:ring-0 flex-1"
          />
        </div>

        {isMobile && (
          <div>
            <MenuIcon />
          </div>
        )}

        {!isMobile && (
          <div className="flex  items-center gap-x-2">
            <div
              onClick={() => router.push("/settings")}
              className="flex items-center gap-x-3 cursor-pointer"
            >
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="text-[11px]">
                  View Profile
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
