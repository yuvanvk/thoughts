"use client";

import { BlogCard } from "./blog-card";
import { PersonalBrand } from "@/components/branding/personal-brand";
import { useTRPC } from "@/lib/trpc/trpc";
import { motion } from "motion/react";

export const Home = () => {
  const trpc = useTRPC();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "linear" }}
    >
      <div className="flex flex-col gap-y-1">
        <div className="w-full">
          <BlogCard variant="col" />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
            <BlogCard variant={"col"} />
          </div>
        </div>
      </div>

      <PersonalBrand />
    </motion.div>
  );
};
