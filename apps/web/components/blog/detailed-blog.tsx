"use client";

import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@workspace/ui/components/skeleton";
import parse from "html-react-parser";
import Image from "next/image";
import { toast } from "sonner";

export const DetailedBlog = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(
    trpc.blog.get.queryOptions({ id } as { id: string })
  );

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
    const dateObj =  new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  }

  return (
    <div className="flex flex-col max-w-6xl mx-auto py-28 space-y-6 w-full">
      <div className="w-fit">
        <Button
          variant={"secondary"}
          className="cursor-pointer w-auto"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="w-full h-96 relative">
        {isLoading ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <Image
            src={data?.blog?.imageUrl || ""}
            alt={data?.blog?.id || "untitled"}
            className="object-cover"
            fill
          />
        )}
      </div>
      <div className="flex items-start justify-between mt-3">
        <div className="flex flex-col max-w-3/4">
          <div className="text-5xl tracking-tight font-medium">
            {isLoading ? (
              <Skeleton className="w-full md:w-28 lg:w-xl xl:w-4xl h-12" />
            ) : (
              `${data?.blog?.title}`
            )}
          </div>
          <div className="flex items-center gap-x-2 my-3 px-0.5">
            <div className="text-sm font-mono  text-neutral-400">
              {isLoading ? (
                <Skeleton className="w-64 h-5" />
              ) : (
                formatDate(data?.blog?.createdAt!)
              )}
            </div>
            <span className="font-mono text-sm text-neutral-400">
              {isLoading ? (
                <Skeleton className="w-20 h-5" />
              ) : (
                `· ${estimatedTime(data?.blog.description!)} min read`
              )}
            </span>
          </div>
          <div className="text-xl tracking-tight font-medium font-mono my-10">
            {isLoading ? (
              <Skeleton className="w-full xl:w-6xl h-32 flex-1" />
            ) : (
              parse(`${data?.blog.description}`)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
