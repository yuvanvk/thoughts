"use client";

import Image from "next/image";
import { BlogCard } from "./blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { PersonalBrand } from "../ui/personal-brand";
import { useMobile } from "@/hooks/useMobile";


export const Home = () => {
    const isMobile = useMobile();

    return (
    <div className="max-w-6xl mx-auto pt-28 pb-5 px-4">
      <div className="flex flex-col gap-y-5">
        <div className="h-[210px] md:h-[350px] lg:min-w-5xl w-full lg:h-[500px] relative overflow-hidden aspect-video">
          <Image src="/images/travel.jpg" alt="hotair-ballon" fill className="object-cover"/>
          <div className="absolute bottom-5 left-3">
            <div className="text-xl lg:text-4xl font-medium font-sans">
              How to Get Rich?
            </div>
            <div className="text-sm lg:text-lg font-mono text-neutral-300">
              A guide to become rich in 1 year
            </div>
          </div>
        </div>
        <div className="my-20">
          <div className="text-xl lg:text-3xl font-medium font-sans capitalize mb-8">
            Most Visited
          </div>

          <div className="space-y-10 mt-5">
            <BlogCard variant={isMobile ? "col" : "row"} />
            <BlogCard variant={isMobile ? "col" : "row"} />
            <BlogCard variant={isMobile ? "col" : "row"} />
          </div>
        </div>
      </div>
      {/* Latest section */}
      <div className="my-10 w-full">
        <div className="text-xl lg:text-3xl font-medium font-sans capitalize mb-8">
          Latest Posts
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="col-span-1">
              <BlogCard variant="col" />
            </div>
          ))}
        </div>
      </div>

      <div className="my-40 w-full">
        <div className="text-xl lg:text-3xl font-medium font-sans capitalize mb-8">
          Categories
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
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
