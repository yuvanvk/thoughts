import { Input } from "@workspace/ui/components/input";
import { ImagePlus } from "lucide-react";
import { Editor } from "./editor";


export const BlogWriting = () => {
  return (
    <div className="flex flex-col px-3">
      <div className="h-64 bg-neutral-900 flex flex-col items-center justify-center space-y-2 w-full">
        <ImagePlus size={30} />
        <p className="text-sm font-mono">Add a Image</p>
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
