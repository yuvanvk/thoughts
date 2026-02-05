"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";
import { Searchbar } from "./search-bar";
import { UserProfile } from "./user-profile";
import { useDebounce } from "@/hooks/useDebounce";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { BlogCard } from "../blog/blog-card";

export const Search = () => {
  const trpc = useTRPC();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedValue = useDebounce(query, 500);

  const { isLoading, data } = useQuery(
    trpc.search.keyword.queryOptions(
      { query: debouncedValue.trim() },
      { enabled: debouncedValue.length > 0 },
    ),
  );

  return (
    <>
      <div className="px-3 py-[8.2px] border-b flex items-center w-full gap-x-3 relative">
        <Searchbar setQuery={setQuery} setOpen={setOpen} />
        <UserProfile />
      </div>
      {open && (
        <div
          className={cn(
            "absolute  h-full w-full",
            "text-center text-xs text-neutral-400 font-sans bg-neutral-900",
            "px-3 py-4",
          )}
        >
          {!isLoading && !data && <div>Try searching for keywords</div>}
          {isLoading && (
            <Loader2 className="text-purple-500 animate-spin mx-auto" />
          )}
          {data && !data?.results.length && <div>No results found</div>}
          {data && data.results.length > 0 && (
            <div className="flex flex-col space-y-2">
              {data.results.map((blog) => <BlogCard blog={blog} variant="row"/>)}
            </div>
          )}
        </div>
      )}
    </>
  );
};
