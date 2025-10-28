"use client";


import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const DetailedBlog = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-7xl mx-auto py-20 space-y-3">
      <div className="w-fit">
        <Button
          variant={"secondary"}
          className="cursor-pointer w-auto"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="w-full h-96 relative">
        <Image
          src={"/images/sport.jpg"}
          alt="football"
          className="object-cover"
          fill
        />
      </div>
      <div className="flex items-start justify-between mt-3">
        <div className="flex flex-col max-w-3/4">
          <div className="text-5xl tracking-tight font-medium">
            The Art of Minimal Design in Modern Web Development
          </div>
          <div className="flex items-center gap-x-2 my-3 px-0.5">
          
            <div className="text-sm font-mono  text-neutral-400">Published on May, 25</div>
            <span className="font-mono text-sm text-neutral-400">· 8 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};
