"use client";

import { SidebarContent } from "@/config/config";
import { Logo } from "../branding/logo";
import { useRouter } from "next/navigation";
import { useMobile } from "@/hooks/useMobile";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@workspace/ui/lib/utils";

export const Sidebar = () => {
  const router = useRouter();
  const isMobile = useMobile();

  const trpc = useTRPC();
  const draftMutation = useMutation(trpc.blog.createDraft.mutationOptions());

  return (
    <>
      {!isMobile ? (
        <div className="hidden lg:flex flex-col space-y-5 py-2 px-1 min-w-[200px] h-full">
          <div className="flex items-center gap-x-2">
            <Logo />
            <div className="font-serif text-2xl">Thoughts</div>
          </div>
          {SidebarContent.map((s) => {
            const Icon = s.icon;
            return (
              <div
                onClick={async () => {
                  if (s.route === "/write") {
                    try {
                      const { message, id } = await draftMutation.mutateAsync();
                      toast.success(message);
                      router.push(`${s.route}/${id}`);
                      return;
                    } catch (error) {
                      toast.error("Unable to create a draft");
                    }
                  }
                  router.push(`${s.route}`);
                }}
                key={s.id}
                className="flex items-center gap-x-2  cursor-pointer"
              >
                <Icon size={20} />
                <div className="font-sans text-[15px]">{s.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-6 py-4 bg-neutral-800 flex items-center justify-between md:hidden absolute w-full -bottom-10 z-10">
          {SidebarContent.map((s) => {
            const Icon = s.icon;
            return (
              <div
                onClick={async () => {
                  if (s.route === "/write") {
                    try {
                      const { message, id } = await draftMutation.mutateAsync();
                      toast.success(message);
                      router.push(`${s.route}/${id}`);
                      return;
                    } catch (error) {
                      toast.error("Unable to create a draft");
                    }
                  }
                  router.push(`${s.route}`);
                }}
                key={s.id}
                className={cn("flex flex-col gap-y-1 items-center")}
              >
                <Icon size={20} />
                <div className="font-sans text-[15px]">{s.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
