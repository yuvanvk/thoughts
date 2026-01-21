"use client";

import { BlogCard } from "./blog-card";
import { PersonalBrand } from "@/components/branding/personal-brand";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import { toast } from "sonner";

export const Home = () => {
  const trpc = useTRPC();

  const { isFetching, isError, data } = useQuery(trpc.blog.getBlogs.queryOptions());

  if (isError) {
    toast.error(data?.message)
    return <div className={cn("flex justify-center items-center")}>
      {data?.message}
    </div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "linear" }}
    >
      <div className="flex flex-col gap-y-1">
        {isFetching && <Skeleton className={cn("h-96 w-full")} />}

        {data?.blogs?.[0] && (
          <BlogCard key={data.blogs[0].id} blog={data.blogs[0]} variant="col" />
        )}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {isFetching && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => <Skeleton key={e} className="h-52" />)}
            {data && data.blogs.map((blog) => <BlogCard key={blog.id} variant="col" blog={blog} />)}
          </div>
        </div>
      </div>

      <PersonalBrand />
    </motion.div>
  );
};
