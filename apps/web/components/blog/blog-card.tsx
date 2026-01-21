"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

import Image from "next/image";
import { useRouter } from "next/navigation";


interface BlogCardProps {
    variant?: "row" | "col",
    blog: {
      id: string;
      title: string;
      description: string;
      createdAt: Date;
      imageUrl?: string | null;
      tags?: { id: string; name: string }[];
      user?: {
        name: string;
        image: string | null;
      }
    }

}

export const BlogCard = ({ variant, blog }: BlogCardProps) => {
    const isColumn = variant === "col";
    const router = useRouter();


    function formatDate(date: Date | string) {
      
      const d = (date instanceof Date) ? date : new Date(date)
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(d)
    }


  return (
    <div onClick={() => router.push(`/blog/${blog.id}`)} className={`flex ${isColumn ? "flex-col" : "flex-row gap-x-2"}  cursor-pointer border dark:bg-[#121212] rounded-[10px] shadow`}>
      <div className={`${isColumn ? "w-full aspect-video" : "w-40 h-40 aspect-square"} relative `}>
        <Image
          src={blog.imageUrl!}
          alt={blog.imageUrl!}
          className="object-cover rounded-[10px]"
          fill
        />
      </div>
      <div className={`flex flex-col justify-between ${isColumn ? "gap-y-5 mt-3" : "gap-y-1"} p-4`}>
        <div>
          <div className="font-medium text-sm font-sans tracking-tight">
            {blog.title}
          </div>
          <div className="text-neutral-500 text-xs line-clamp-2 font-sans">
            {blog.description}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-5 h-5">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <span className=" text-[10px] font-medium uppercase font-mono text-gray-300">
              {blog.user?.name}
            </span>
          </div>
          <div className="text-[10px] font-light font-mono text-gray-300">
            {formatDate(blog.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
