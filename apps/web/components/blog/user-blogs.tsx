"use client";

import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { BlogCard } from "./blog-card";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@workspace/ui/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const UserBlogs = () => {
  const trpc = useTRPC();
  const router = useRouter();

  const { isError, isFetching, data } = useQuery(trpc.blog.getUserBlogs.queryOptions());

  if (isError) {
    toast.error(data?.message);
    router.push("/home");
    return;
  }

  return (
    <ScrollArea className={cn("w-full pb-5 px-4 h-[90vh]")}>
      <div>
        <div className={cn("flex flex-col gap-y-1")}>
          <div>
            {isFetching && (
              <div className={cn("grid grid-cols-2 gap-4  mt-2")}>
                <Skeleton className="w-full h-52" />
                <Skeleton className="w-full h-52" />

                <Skeleton className="w-full h-52" />
                <Skeleton className="w-full h-52" />
              </div>
            )}

            {!isFetching && data && data?.blogs.length > 0 && (
              <div className={cn("grid grid-cols-2 gap-4  mt-2")}>
                {data?.blogs.map((b) => (
                  <BlogCard key={b.id} variant="col" blog={b} />
                ))}
              </div>
            )}

            {!isFetching && !data && (
              <div className="text-sm font-sans text-center">
                No blogs found
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
