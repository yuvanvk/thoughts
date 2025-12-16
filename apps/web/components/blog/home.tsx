"use client";

import Image from "next/image";
import { BlogCard } from "./blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { PersonalBrand } from "../ui/personal-brand";


export const Home = () => {
  
  return (
    <div className="max-w-6xl mx-auto pt-32 pb-5">

      <div className=" flex flex-col gap-y-5">
        <div className="min-w-5xl w-full h-[500px]  relative overflow-hidden">
          <Image src="/images/travel.jpg" alt="hotair-ballon" fill />
          <div className="absolute bottom-5 left-3">
            <div className="text-4xl font-medium font-sans">
              How to Get Rich?
            </div>
            <div className="text-lg font-mono text-neutral-300">
              A guide to become rich in 1 year
            </div>
          </div>
        </div>
        <div className="my-20">
          <div className="text-3xl font-medium font-sans capitalize">
            Most Visited
          </div>

          <div className="space-y-5 mt-5">
            <BlogCard variant="row" />
            <BlogCard variant="row" />
            <BlogCard variant="row" />
          </div>
        </div>
      </div>
      {/* Latest section */}
      <div className="my-10 w-full">
        <div className="text-3xl font-medium font-sans capitalize">
          Latest Posts
        </div>

        <div className="grid grid-cols-2 gap-5 mt-6">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="col-span-1">
              <BlogCard variant="col" />
            </div>
          ))}
        </div>
      </div>

      <div className="my-20 w-full">
        <div className="text-3xl font-medium font-sans capitalize">
          Categories
        </div>

        <div className="grid grid-cols-2 gap-5 mt-6">
          {[
            "/images/travel.jpg",
            "/images/sport.jpg",
            "/images/Science.jpg",
            "/images/fashion.jpg",
          ].map((idx) => (
            <CategoryCard key={idx} title="Travel" imageUrl={idx} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <PersonalBrand />
    </div>
  );
};
