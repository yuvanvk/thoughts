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
    <div className={`flex ${isColumn ? "flex-col" : "flex-row gap-x-2"}  cursor-pointer border bg-[#121212]`}>
      <div className={`${isColumn ? "w-full aspect-video" : "w-40 h-40 aspect-square"} relative `}>
        <Image
          src={"/images/sport.jpg"}
          alt="h"
          className="object-cover"
          fill
        />
      </div>
      <div className={`flex flex-col justify-between ${isColumn ? "gap-y-5 mt-3" : "gap-y-1"} px-2 py-2`}>
        <div>
          <div className="font-medium text-xl font-sans tracking-tight">
            Pick the Best Travel Guide To Enjoy With Travel Switzerland in Feb
          </div>
          <div className="text-neutral-500 text-sm line-clamp-2 font-mono">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem saepe dolorem itaque quia. Nemo mollitia vero, ex
            assumenda impedit atque dolorem architecto amet ullam doloribus?
            Consectetur ipsa maxime magni ipsum!
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar  className="!rounded-none">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <span className=" text-sm font-medium uppercase font-mono text-gray-300">
              Abhi Vignesh
            </span>
          </div>
          <div className="text-sm font-light font-mono text-gray-300">
            25/05/2005
          </div>
        </div>
      </div>
    </div>
  );
};
