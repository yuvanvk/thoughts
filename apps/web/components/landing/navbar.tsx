"use client";

import { useRouter } from "next/navigation";
import { Logo } from "../branding/logo";
import { Button } from "@workspace/ui/components/button";

export const Navbar = () => {
    const router = useRouter();

    return <div className="flex items-center justify-between gap-x-2  w-full px-3 bg-white backdrop-blur-lg dark:bg-black">
       <div onClick={() => router.push("/")} className="uppercase cursor-pointer flex items-center gap-x-1 font-instrument-serif ">
            <Logo />
            <span className="font-serif text-xl">Thoughts</span>
        </div>

        <div className="flex items-center gap-x-2">
            <button className="rounded-[10px] px-4 py-1.5 font-semibold text-[13px] shadow bg-neutral-900">Log in</button>
            <button className="bg-purple-500 text-white rounded-[10px] text-[13px] px-4 py-1.5 shadow font-medium">Create Profile</button>
        </div>
    </div>
}