"use client";

import { SidebarContent } from "@/config/config";
import { Logo } from "../branding/logo";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="hidden md:flex flex-col space-y-5 py-2 px-1 min-w-[200px]">
      <div className="flex items-center gap-x-2">
        <Logo />
        <div className="font-serif text-2xl">Thoughts</div>
      </div>
      {SidebarContent.map((s) => {
        const Icon = s.icon
        return (
          <div onClick={() => router.push(`${s.route}`)} key={s.id} className="flex items-center gap-x-2  cursor-pointer">
            <Icon size={20} />
            <div className="font-sans text-[15px]">{s.name}</div>
          </div>
        );
      })}
    </div>
  );
};
