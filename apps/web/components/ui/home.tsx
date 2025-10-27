"use client";

import Image from "next/image";
import { Separator } from "@workspace/ui/components/separator";
import { BlogCard } from "./blog-card";
import { CategoryCard } from "./category-card";

export const Home = () => {
  return (
    <div className="w-screen h-screen py-24 px-8">
      {/* hero-section */}
      <div className="w-full h-[600px] flex gap-x-8">
        <div className="min-w-5xl h-full relative overflow-hidden">
          <Image src="/images/hotair.jpg" alt="hotair-ballon" fill />
        </div>
        <div className="flex-1">
          <div className="text-3xl font-medium font-sans capitalize">
            Most Visited
          </div>
          <Separator className="my-3" />
          <div className="space-y-2">
            <BlogCard variant="row" />
            <Separator className="my-3" />
            <BlogCard variant="row" />
            <Separator className="my-3" />
            <BlogCard variant="row" />
          </div>
        </div>
      </div>
      {/* Latest section */}
      <div className="my-10 w-full">
        <div className="text-3xl font-medium font-sans capitalize">
          Latest Posts
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-4 gap-x-5 mt-6">
          {[0, 1, 2, 3].map((idx) => (
            <div className="col-span-1">
              <BlogCard variant="col" />
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 w-full">
        <div className="text-3xl font-medium font-sans capitalize">
          Categories
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-2 gap-5 mt-6">
          {[
            "/images/travel.jpg",
            "/images/sport.jpg",
            "/images/Science.jpg",
            "/images/fashion.jpg",
          ].map((idx) => (
            <CategoryCard title="Travel" imageUrl={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
