"use client";

import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { BlogCard } from "./blog-card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { toast } from "sonner";
import { motion } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";

export const CategoryBlogs = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const trpc = useTRPC();

  const { isError, isFetching, data } = useQuery(trpc.blog.filter.queryOptions({ tag: slug as string }));

  if (isError) {
    toast.error(data?.message);
    router.push("/home");
    return;
  }

  return (
    <div className="px-4">
      {!isFetching && !data?.blogs.length && (
        <div className={cn("text-center font-sans text-sm")}>No blogs found.</div>
      )}
      {isFetching && (
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((e) => (
            <Skeleton key={e} className="w-full h-52" />
          ))}
        </div>
      )}
      {data && (
        <motion.div
        initial={{
            opacity: 0,
            filter: "blur(10px)"
        }}
        animate={{
            opacity: 1,
            filter: "blur(0px)"
        }}
        className="grid grid-cols-2 gap-4">
          {data.blogs.length > 0 &&
            data.blogs.map((b) => <BlogCard key={b.id} variant="col" />)}
        </motion.div>
      )}
    </div>
  );
};
