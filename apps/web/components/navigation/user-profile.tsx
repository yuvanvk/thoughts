"use client";

import { authClient } from "@/lib/better-auth/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";
import { Bookmark, Moon, Power, Settings, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("triggered");
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  return (
    <div ref={ref}>
      <Avatar onClick={() => setOpen((c) => !c)}>
        <AvatarImage src={"https://github.com/shadcn.png"} />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-0 flex flex-col h-screen z-[100]",
              "bg-white dark:bg-neutral-900"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between",
                "px-6 py-[9.1px] border-b"
              )}
            >
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={cn(
                  "flex items-center justify-center",
                  "border dark:border-neutral-700 dark:bg-neutral-800",
                  "p-1 rounded-[9px] cursor-pointer"
                )}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className={cn(
                  " flex items-center justify-center",
                  "border dark:border-neutral-700 dark:bg-neutral-800",
                  "p-1 rounded-[9px] cursor-pointer"
                )}
              >
                <X size={20} />
              </button>
            </div>

            <button
              disabled
              className={cn(
                "flex items-center gap-x-2  tracking-tight rounded-[9px]",
                "hover:bg-indigo-50 dark:hover:bg-neutral-800",
                "px-4 py-2 mx-3 mt-5 cursor-default",
              )}
            >
              <Avatar className={cn("w-5 h-5")}>
                <AvatarImage src={"https://github.com/shadcn.png"} />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>

              <div className={cn("flex flex-col items-start")}>
                <div className={cn("text-[13px]")}>Abhi Vignesh</div>
                <div className={cn("text-[10px] text-neutral-400 lowercase")}>
                    abhivigneshofficial@gmail.com
                </div>
                <div></div>
              </div>
            </button>

            <button
            onClick={() => router.push("/settings")}
              className={cn( 
                "flex items-center gap-x-2  tracking-tight rounded-[9px]",
                "hover:bg-indigo-50 dark:hover:bg-neutral-800",
                "px-4 py-2 mx-3 cursor-pointer",
              )}
            >
              <Settings size={17} />

              <div className={cn("flex flex-col items-start")}>
                <div className={cn("text-[13px]")}>Settings</div>
                <div className={cn("text-[10px] text-neutral-400")}>
                  Edit your profile, account.
                </div>
                <div></div>
              </div>
            </button>

            <button
              onClick={() => router.push("/bookmarks")}
              className={cn(
                "flex items-center gap-x-2  tracking-tight rounded-[9px]",
                "hover:bg-indigo-50 dark:hover:bg-neutral-800",
                "px-4 py-2 mx-3 cursor-pointer",
              )}
            >
              <Bookmark size={17} />

              <div className={cn("flex flex-col items-start")}>
                <div className={cn("text-[13px]")}>Bookmarks</div>
                <div className={cn("text-[10px] text-neutral-400")}>
                  Saved blogs to visit later.
                </div>
                <div></div>
              </div>
            </button>

            <div
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login")
                    }
                  }
                })
              }}
              className={cn(
                "flex items-center gap-x-4 text-rose-500 px-4 py-2 text-[12px] mt-5 mx-3 cursor-pointer"
              )}
            >
              <Power size={17} />
              <div>Log Out</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
