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

import { useParams, useRouter } from "next/navigation";
import { useMobile } from "@/hooks/useMobile";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";

export const Appbar = () => {
  const router = useRouter();
  const isMobile = useMobile();
  const params = useParams();
  const { id } = params;
  return (
    <div className="w-full h-fit z-50 backdrop-blur-3xl border-b">
      <div className="w-full  mx-auto flex items-center justify-between px-3 xl:px-4 py-[12.9px]">
        <div className="flex items-center gap-x-2">
          {id && (
            <Button
            size={"sm"}
              variant={"outline"}
              className="cursor-pointer w-auto rounded-[10px] p-2! dark:bg-neutral-800! dark:border-neutral-700!"
              onClick={() => router.back()}
            >
              <ArrowLeft size={20}/>
            </Button>
          )}
          <p className="text-[15px] font-medium font-sans">Blogs</p>
        </div>

        {isMobile && (
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
