"use client";

import { cn } from "@workspace/ui/lib/utils";
import { toast } from "sonner";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { BlogCard } from "@/components/blog/blog-card";
import { useRouter } from "next/navigation";

export const Drafts = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const { isFetching, isError, data } = useQuery(trpc.blog.getDrafts.queryOptions());

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
              <div
                className={cn("grid grid-cols-1  md:grid-cols-2 gap-4  mt-2")}
              >
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full h-52" />
                ))}
              </div>
            )}

            {!isFetching && data && data?.drafts.length > 0 && (
              <div
                className={cn("grid grid-cols-1 md:grid-cols-2 gap-4  mt-2")}
              >
                {data?.drafts.map((b) => (
                  <BlogCard key={b.id} variant="col" blog={b} />
                ))}
              </div>
            )}

            {!isFetching && !data && (
              <div className="text-sm font-sans text-center">
                No drafts found
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
