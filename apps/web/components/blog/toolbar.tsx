"use client";

import { useCurrentEditor } from "@tiptap/react";
import { BoldIcon } from "lucide-react";

export const Toolbar = () => {
  const { editor } = useCurrentEditor();
    
  return (
    <div className="fixed bottom-5 max-w-6xl  left-1/2 -translate-x-1/2 px-2 py-3  shadow-sm dark:bg-neutral-900 bg-white w-full border flex items-center gap-x-2 z-10">
      <button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={`${editor?.isActive("bold") ? "is-active" : ""} cursor-pointer`}
      >
        <BoldIcon size={20}/>
      </button>
    </div>
  );
};
