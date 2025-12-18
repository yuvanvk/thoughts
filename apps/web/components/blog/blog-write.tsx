import { Input } from "@workspace/ui/components/input";
import { ImagePlus } from "lucide-react";
import { Editor } from "./editor";


export const BlogWriting = () => {
  return (
    <div className="flex flex-col px-3">
      <div className="group h-64 bg-[#19191D] flex flex-col items-center justify-center space-y-2 w-full border-2 border-x border-y border-dashed cursor-pointer hover:border-orange-400 transition-all duration-200 rounded-2xl">
        <div className="flex items-center justify-center border border-neutral-800 group-hover:shadow-orange-400 group-hover:shadow-2xs rounded-[10px] p-4 duration-200"> 
        <ImagePlus size={30} className="text-neutral-500 group-hover:text-orange-400 duration-200 transition-all"/>
        </div>
        <p className="text-sm font-sans text-neutral-400">Add a cover Image</p>
      </div>

      <div>
        <Input
          className="w-full !border-none !bg-black my-4 !text-4xl py-10 px-0 focus-visible:ring-0"
          type="text"
          placeholder="Title"
        />
      </div>
      <Editor />
    </div>
  );
};
