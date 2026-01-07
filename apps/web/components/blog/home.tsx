"use client";

import { BlogCard } from "./blog-card";
import { PersonalBrand } from "../branding/personal-brand";

import { ScrollArea } from "@workspace/ui/components/scroll-area";

export const Home = () => {

  return (
    <ScrollArea className="w-full pb-5 px-4 h-[90vh]">
      <div>
        <div className="flex flex-col gap-y-1">
          <div className="w-full">
            <BlogCard variant="col"/>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4  mt-2">
              <BlogCard variant={"col"} />
              <BlogCard variant={"col"} />
              <BlogCard variant={"col"} />
            </div>
          </div>
        </div>
        <div className="my-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="col-span-1">
                <BlogCard variant="col" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <PersonalBrand />
      </div>
    </ScrollArea>
  );
};
