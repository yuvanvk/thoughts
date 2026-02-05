"use client";

import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const Searchbar = ({ setQuery, setOpen }: { setQuery: Dispatch<SetStateAction<string>>, setOpen: Dispatch<SetStateAction<boolean>>}) => {

  return (
    <div className="flex-1">
      <div className="flex items-center gap-x-1  border rounded-[8px] px-2 border-neutral-200 dark:border-neutral-700">
        <Search size={13} className="text-neutral-400" />
        <Input
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search"
          className={cn("flex-1 border-none outline-none text-sm! h-7 px-0 py-0",
            "dark:bg-neutral-900!",
            "focus:ring-0 focus-visible:ring-0"
          )}
        />
      </div>
    </div>
  );
};
