"use client";

import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BlogCard } from "@/components/blog/blog-card";

export const BookMark = ({ }) => {
  const trpc = useTRPC();
  const router = useRouter();

  const { isLoading, data, isError } = useQuery(
    trpc.blog.getUserBookMarks.queryOptions()
  );
  if (isError) {
    toast.error(data?.message);
    router.push("/home");
    return;
  }

  return  <div>
  <div className={cn("flex flex-col gap-y-1")}>
    <div>
      {isLoading && (
        <div
          className={cn("grid grid-cols-1  md:grid-cols-2 gap-4  mt-2")}
        >
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-52" />
          ))}
        </div>
      )}

      {!isLoading&& data && data?.userBookmarks.length > 0 && (
        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-4  mt-2")}
        >
          {data?.userBookmarks.map((b) => (
            <BlogCard key={b.id} variant="col" blog={b.blog} />
          ))}
        </div>
      )}

      {!isLoading && !data?.userBookmarks.length && (
        <div className="text-sm font-sans text-center mt-5">
          No drafts found
        </div>
      )}
    </div>
  </div>
</div>
};
