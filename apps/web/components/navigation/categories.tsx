"use client";

import { Category } from "@/config/config";
import { cn } from "@workspace/ui/lib/utils";
import { useParams, useRouter } from "next/navigation";

export const Categories = () => {
  const params = useParams();
  const { category } = params;
  const router = useRouter();

  return (
    <div className={cn("flex flex-col w-full text-xs px-5 py-2 gap-y-1.5 ")}>
      {Category.map((c) => (
        <div
          onClick={() => router.push(`/blog/category/${c.route}`)}
          key={c.id}
          className={cn("flex items-center justify-between cursor-pointer")}
        >
          <div className={cn(`${category === c.route ? "text-white" : "text-neutral-400"} font-sans`)}>{c.name}</div>
          <div
            className={cn(
              "px-2.5 py-1 bg-neutral-800 rounded-[8px] font-mono text-[10px]"
            )}
          >
            {c.count}
          </div>
        </div>
      ))}
    </div>
  );
};
