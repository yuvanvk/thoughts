"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { PostStatus } from "@prisma/client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/trpc";
import { toast } from "sonner";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

interface BlogCardProps {
  variant?: "row" | "col";
  bookmark?: boolean;
  blog: {
    id: string;
    title: string;
    description: string;
    status: PostStatus;
    createdAt: Date | string;
    imageUrl?: string | null;
    tags?: { id: string; name: string }[];
    user?: {
      name: string;
      image: string | null;
    };
  };
}

export const BlogCard = ({
  variant,
  blog,
  bookmark = false,
}: BlogCardProps) => {
  const [isBookmark, setIsBookmark] = useState(bookmark);

  const isColumn = variant === "col";
  const router = useRouter();
  const trpc = useTRPC();

  const bookmarkMutation = useMutation(
    trpc.blog.addToBookmark.mutationOptions(),
  );
  const removeFromBookmarkMutation = useMutation(
    trpc.blog.removeBookMark.mutationOptions(),
  );

  function formatDate(date: Date | string) {
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  }

  const handleBookmark = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      if (isBookmark) {
        const response = await removeFromBookmarkMutation.mutateAsync({
          id: blog.id,
        });
        setIsBookmark(false);
        toast.success(response.message);
      } else {
        const response = await bookmarkMutation.mutateAsync({
          id: blog.id,
        });
        setIsBookmark(true);
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div
      onClick={() => {
        blog.status === "DRAFT"
          ? router.push(`/write/${blog.id}`)
          : router.push(`/blog/${blog.id}`);
      }}
      className={`flex ${isColumn ? "flex-col" : "flex-row gap-x-2"}  cursor-pointer border dark:bg-[#121212] rounded-[10px] shadow`}
    >
      <div
        className={`${isColumn ? "w-full aspect-video" : "w-40 h-40 aspect-square"} relative `}
      >
        <Image
          src={blog.imageUrl ? blog.imageUrl : "/images/default_banner.jpeg"}
          alt={blog.imageUrl ? blog.imageUrl : "default_image"}
          className="object-cover rounded-[10px]"
          fill
        />
      </div>
      <div
        className={`flex flex-col justify-between ${isColumn ? "gap-y-5 mt-3" : "gap-y-1"} p-4 relative`}
      >
        <div>
          <div className="font-medium text-sm font-sans tracking-tight">
            {blog.title || "Title"}
          </div>
          <div className="text-neutral-500 text-xs line-clamp-2 font-sans">
            {blog.description || "Write..."}
          </div>
        </div>
        <Bookmark
          onClick={(e) => handleBookmark(e)}
          size={15}
          fill={`${isBookmark && "yellow"}`}
          className={cn(
            "absolute right-3 top-5",
            `${isBookmark ? "text-yellow-500" : "text-white"}`,
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-5 h-5">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <span className=" text-[10px] font-medium uppercase font-mono text-neutral-800 dark:text-gray-300">
              {blog.user?.name}
            </span>
          </div>
          <div className="text-[10px] font-light font-mono text-neutral-700 dark:text-gray-300">
            {formatDate(blog.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
