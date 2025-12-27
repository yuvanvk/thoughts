"use client";

import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@workspace/ui/components/skeleton";
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
    return
  }

  return (
    <div className="flex flex-col max-w-6xl mx-auto py-28 space-y-6">
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
              <Skeleton className="w-full md:w-28 lg:w-xl h-12" />
            ) : (
              `${data?.blog?.title}`
            )}
          </div>
          <div className="flex items-center gap-x-2 my-3 px-0.5">
            <div className="text-sm font-mono  text-neutral-400">
              {isLoading ? (
                <Skeleton className="w-64 h-5" />
              ) : (
                `${data?.blog?.createdAt}`
              )}
            </div>
            <span className="font-mono text-sm text-neutral-400">
              {isLoading ? (
                <Skeleton className="w-20 h-5" />
              ) : (
                `· ${8} min read`
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
