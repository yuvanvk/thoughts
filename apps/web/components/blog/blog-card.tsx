"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

import Image from "next/image";


interface BlogCardProps {
    variant?: "row" | "col"
}

export const BlogCard = ({ variant }: BlogCardProps) => {
    const isColumn = variant === "col";


  return (
    <div className={`flex ${isColumn ? "flex-col" : "flex-row gap-x-2"}  cursor-pointer border dark:bg-[#121212] rounded-[10px] shadow`}>
      <div className={`${isColumn ? "w-full aspect-video" : "w-40 h-40 aspect-square"} relative `}>
        <Image
          src={"https://dqy38fnwh4fqs.cloudfront.net/blog/featured-bf77b9a5-c7c3-49fa-a9a0-e48937b046b1"}
          alt="h"
          className="object-cover rounded-[10px]"
          fill
        />
      </div>
      <div className={`flex flex-col justify-between ${isColumn ? "gap-y-5 mt-3" : "gap-y-1"} p-4`}>
        <div>
          <div className="font-medium text-sm font-sans tracking-tight">
            Pick the Best Travel Guide To Enjoy With Travel Switzerland in Feb
          </div>
          <div className="text-neutral-500 text-xs line-clamp-2 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem saepe dolorem itaque quia. Nemo mollitia vero, ex
            assumenda impedit atque dolorem architecto amet ullam doloribus?
            Consectetur ipsa maxime magni ipsum!
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-5 h-5">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <span className=" text-[10px] font-medium uppercase font-mono text-gray-300">
              Abhi Vignesh
            </span>
          </div>
          <div className="text-[10px] font-light font-mono text-gray-300">
            25/05/2005
          </div>
        </div>
      </div>
    </div>
  );
};
