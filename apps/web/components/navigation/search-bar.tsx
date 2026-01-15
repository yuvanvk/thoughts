"use client";

import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1">
      <div className="flex items-center gap-x-1  border rounded-[8px] px-2 border-neutral-200 dark:border-neutral-700">
        <Search size={13} className="text-neutral-400" />
        <Input
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search"
          className="border-none !bg-neutral-900  focus:ring-0 outline-none focus-visible:ring-0 flex-1 text-sm! h-7 px-0 py-0"
        />
      </div>
    </div>
  );
};
