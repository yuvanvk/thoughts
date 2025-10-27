"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import Image from "next/image";

export const BlogCard = () => {
  return (
    <div className="flex gap-x-2 px-1 cursor-pointer">
      <div className="w-40 h-40 relative aspect-square">
        <Image
          src={"/images/hotair.jpg"}
          alt="h"
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col justify-between gap-y-1 px-2">
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
            <Avatar>
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar> 
          <span className=" text-sm font-medium uppercase font-mono text-gray-300">Abhi Vignesh</span>
          </div>
          <div className="text-sm font-light font-mono text-gray-300">25/05/2005</div>
        </div>
      </div>
    </div>
  );
};
