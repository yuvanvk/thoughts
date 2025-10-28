"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

export const Appbar = () => {
    return (
        <div className="fixed w-full border-b z-50 bg-black ">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-2">
            <div>
             <svg fill="none" height="48" viewBox="0 0 40 48" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="m0 4h10v10h-10z"/><path d="m20 4h10v10h-10z" opacity=".6"/><path d="m10 14h10v10h-10z" opacity=".6"/><path d="m20 14h10v10h-10z" opacity=".45"/><path d="m30 14h10v10h-10z" opacity=".3"/><path d="m0 24h10v10h-10z" opacity=".6"/><path d="m10 24h10v10h-10z" opacity=".45"/><path d="m20 24h10v10h-10z" opacity=".3"/><path d="m30 24h10v10h-10z" opacity=".15"/><path d="m10 34h10v10h-10z" opacity=".3"/><path d="m20 34h10v10h-10z" opacity=".15"/></g></svg>
            </div>

            <div className="flex items-center gap-x-3">
                <Avatar className="!rounded-none">
                    <AvatarImage src={"https://github.com/shadcn.png"}/>
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
            </div>
        </div>
        </div>
    )
}