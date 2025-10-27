"use client";

import Image from "next/image";
import { Separator } from "@workspace/ui/components/separator";
import { BlogCard } from "./blog-card";

export const Home = () => {
  return <div className="w-screen h-screen py-24 px-8">
    <div className="w-full h-[600px] flex gap-x-8">
        <div className="min-w-5xl h-full relative overflow-hidden"> 
            <Image src="/images/hotair.jpg" alt="hotair-ballon" fill />
        </div>
        <div className="flex-1">
            <div className="text-3xl font-medium font-sans capitalize">Most Visited</div>
            <Separator className="my-3"/>
            <div className="space-y-2">
                <BlogCard />
                <Separator className="my-3"/>
                <BlogCard />
                <Separator className="my-3"/>
                <BlogCard />
            </div>
        </div>
    </div>
  </div>;
};
