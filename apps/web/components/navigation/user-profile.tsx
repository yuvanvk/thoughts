"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Bookmark, LogOut, Power, Settings, Sun, X } from "lucide-react";
import { motion } from "motion/react";

export const UserProfile = () => {
  return (
    <div className="cursor-pointer">
      <Avatar>
        <AvatarImage src={"https://github.com/shadcn.png"} />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>

      <motion.div className="absolute inset-0 flex flex-col z-20 bg-neutral-900 h-screen">
        <div className="flex items-center justify-between px-4 py-[9.1px] border-b">
          <div className="p-1 rounded-[9px] flex items-center justify-center border border-neutral-700 bg-neutral-800">
            <Sun size={20} />
          </div>
          <div className="p-1 rounded-[9px] flex items-center justify-center border border-neutral-700 bg-neutral-800">
            <X size={20} />
          </div>
        </div>

        <div className="flex items-center gap-x-2 px-4 py-2 mt-5 tracking-tight">
          <Avatar className="w-5 h-5">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <div className="text-[13px]">Abhi Vignesh</div>
            <div className="text-[10px] text-neutral-400">Checkout your profile.</div>
            <div></div>
          </div>
        </div>

        <div className="flex items-center gap-x-2 px-4 py-2  tracking-tight">
          <Settings size={17}/>

          <div className="flex flex-col">
            <div className="text-[13px]">Settings</div>
            <div className="text-[10px] text-neutral-400">Edit your profile, account.</div>
            <div></div>
          </div>
        </div>

        <div className="flex items-center gap-x-2 px-4 py-2  tracking-tight">
          <Bookmark size={17}/>

          <div className="flex flex-col">
            <div className="text-[13px]">Bookmarks</div>
            <div className="text-[10px] text-neutral-400">Saved blogs to visit later.</div>
            <div></div>
          </div>
        </div>


        <div  className="flex items-center gap-x-4 text-rose-500 px-4 py-2 text-[12px] mt-5">
        <Power size={17}/>
        <div>Log Out</div>
        </div>

      </motion.div>
    </div>
  );
};
