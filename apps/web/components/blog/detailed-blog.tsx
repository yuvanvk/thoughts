"use client";

import Image from "next/image";
import parse from "html-react-parser";

import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { toast } from "sonner";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";

import { motion } from "motion/react";

export const DetailedBlog = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(trpc.blog.get.queryOptions({ id } as { id: string }));

  if (error) {
    toast.error(error.message);
    router.push("/home");
    return;
  }

  function estimatedTime(content: string) {
    if (!content) return;

    const text = content.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);

    return minutes;
  }

  function formatDate(date: string) {
    if (!date) return "";
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  }

  return (
    <ScrollArea className={cn("h-[90vh] px-4")}>
      <motion.div
        initial={{ 
          opacity: 0, 
          filter: "blur(10px)" 
        }}
        animate={{ 
          opacity: 1,
          filter: "blur(0px)" 
        }}
        transition={{ 
          duration: 0.3, 
          ease: "linear" 
        }}
        className={cn("flex flex-col max-w-xl mx-auto space-y-6",
          "max-w-xl mx-auto w-full"
        )}
      >
        <div className={cn("w-full h-72 relative")}>
          {isLoading ? (
            <Skeleton className={cn("absolute inset-0")} />
          ) : (
            <Image
              src={data?.blog?.imageUrl || ""}
              alt={data?.blog?.id || "untitled"}
              className={cn("object-cover rounded-2xl")}
              fill
            />
          )}
        </div>
        <div className={cn("flex items-start justify-between",
          "mt-3"
        )}>
          <div className={cn("flex flex-col",
            "max-w-3/4"
          )}>
            <div className={cn("text-[42px] tracking-tight font-medium")}>
              {isLoading ? (
                <Skeleton className={cn("w-full")} />
              ) : (
                `${data?.blog?.title}`
              )}
            </div>
            <div className={cn("flex items-center gap-x-2",
              "ml-2"
            )}>
              <Avatar className={cn("w-6 h-6")}>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <div className={cn("flex flex-col")}>
                <div className={cn("uppercase text-xs")}>Abhi Vignesh</div>
                <div className={cn("flex items-center")}>
                  <div
                    className={cn("text-[10px] font-sans  text-neutral-400")}
                  >
                    {isLoading ? (
                      <Skeleton className={cn("w-64 h-5")} />
                    ) : (
                      formatDate(data?.blog?.createdAt!)
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-sans text-[10px] text-neutral-400 ml-0.5"
                    )}
                  >
                    {isLoading ? (
                      <Skeleton className={cn("w-20 h-5")} />
                    ) : (
                      `· ${estimatedTime(data?.blog.description!)} min read`
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={cn(
                "text-[14px] tracking-normal font-[400] font-sans my-10"
              )}
            >
              {isLoading ? (
                <Skeleton className={cn("w-full xl:w-6xl h-32 flex-1")} />
              ) : (
                parse(`${data?.blog.description}`)
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollArea>
  );
};
