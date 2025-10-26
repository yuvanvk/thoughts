"use client";

import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter();

    return <div className="fixed flex items-center justify-between w-full px-16 py-4 uppercase bg-black border-b">
        <div onClick={() => router.push("/")} className="uppercase cursor-pointer">Thoughts</div>
        <div className="flex items-center gap-x-8 font-mono">
            <div onClick={() => router.push("/signup")} className="cursor-pointer">sign up</div>
            <div onClick={() => router.push("/login")} className="cursor-pointer">login</div>
        </div>
    </div>
}