"use client";

import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative">
        <div className="flex items-center bg-neutral-950 border rounded-full w-[600px]">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search"
            className="border-none !bg-transparent focus:ring-0 outline-none focus-visible:ring-0 flex-1 ml-1"
          />
          <div className=" bg-neutral-800 rounded-r-full flex w-14 h-9 items-center justify-center">
            <Search size={20} className="text-neutral-400" />
          </div>
        </div>

        {open && (
          <div className="absolute top-full mt-2 w-full bg-neutral-900  border shadow-lg max-w-[600px] rounded-[8px] p-2">
            <div className="px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700 rounded-[8px] cursor-pointer flex items-center gap-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                focusable="false"
                aria-hidden="true"
                className="text-white"
              >
                <path
                  fill="currentColor"
                  d="M8.76 1.487a11 11 0 11-7.54 12.706 1 1 0 011.96-.4 9 9 0 0014.254 5.38A9 9 0 0016.79 4.38 9 9 0 004.518 7H7a1 1 0 010 2H1V3a1 1 0 012 0v2.678a11 11 0 015.76-4.192ZM12 6a1 1 0 00-1 1v5.58l.504.288 3.5 2a1 1 0 10.992-1.736L13 11.42V7a1 1 0 00-1-1Z"
                ></path>
              </svg>
              <div className="lowercase">Suggested result 1</div>
            </div>
            <div className="px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700 rounded-[8px] cursor-pointer flex items-center gap-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                focusable="false"
                aria-hidden="true"
                className="text-white"
              >
                <path
                  fill="currentColor"
                  d="M8.76 1.487a11 11 0 11-7.54 12.706 1 1 0 011.96-.4 9 9 0 0014.254 5.38A9 9 0 0016.79 4.38 9 9 0 004.518 7H7a1 1 0 010 2H1V3a1 1 0 012 0v2.678a11 11 0 015.76-4.192ZM12 6a1 1 0 00-1 1v5.58l.504.288 3.5 2a1 1 0 10.992-1.736L13 11.42V7a1 1 0 00-1-1Z"
                ></path>
              </svg>
              <div className="lowercase">Suggested result 1</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
