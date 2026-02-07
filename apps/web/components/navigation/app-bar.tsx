"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useMobile } from "@/hooks/useMobile";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { UserProfile } from "./user-profile";

export const Appbar = () => {
  const router = useRouter();
  const isMobile = useMobile();
  const params = useParams();
  const pathName = usePathname();
  
  const currentPath = pathName.split("/")[1]
  const { id } = params;
  
  return (
    <div className="w-full h-fit border-b z-50">
      <div className="w-full  mx-auto flex items-center justify-between px-3 xl:px-4 py-[12.9px]">
        <div className="flex items-center gap-x-2">
          {id && (
            <Button
              size={"sm"}
              variant={"outline"}
              className="cursor-pointer w-auto rounded-[10px] p-2! dark:bg-neutral-800! dark:border-neutral-700!"
              onClick={() => router.back()}
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <p className="text-[15px] font-medium font-sans capitalize">{currentPath}</p>
        </div>

        {isMobile && <UserProfile />}
      </div>
    </div>
  );
};
