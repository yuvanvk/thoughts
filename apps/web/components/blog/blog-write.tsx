"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Input } from "@workspace/ui/components/input";
import { ImagePlus } from "lucide-react";
import { Editor } from "./editor";
import { Button } from "@workspace/ui/components/button";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";

export const BlogWriting = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Underline,
      Italic,
      HorizontalRule,
      Highlight,
      Heading,
    ],
    content: "<p>Share your thoughts</p>",
    immediatelyRender: false,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "outline-none h-64",
      },
    },
  });

  const router = useRouter();
  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex flex-col px-3">
        <div className={cn("flex items-center justify-between pb-5")}>
          <Button
            onClick={() => router.push("/home")}
            className={cn("rounded-[8px] cursor-pointer")}
            size={"sm"}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log(JSON.stringify(editor.getJSON(), null, 2));
            }}
            className={cn(
              "rounded-[8px] bg-lime-700 text-white cursor-pointer",
              "hover:bg-lime-800"
            )}
            size={"sm"}
          >
            Publish
          </Button>
        </div>
        <div
          className={cn(
            "group h-64 bg-neutral-900 flex flex-col items-center justify-center space-y-2 w-full border-2 border-dashed cursor-pointer rounded-2xl",
            "border-2 border-dashed hover:border-neutral-700",
            "transition-all duration-200"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center border border-neutral-800 rounded-[10px] p-4 duration-200",
              "group-hover:shadow-neutral-600/70 shadow-xs"
            )}
          >
            <ImagePlus
              size={20}
              className={cn(
                "text-neutral-500 group-hover:text-neutral-300",
                "duration-200 transition-all"
              )}
            />
          </div>
          <p className={cn("text-[12px] font-sans text-neutral-400")}>
            Add a cover Image
          </p>
        </div>

        <div>
          <Input
            className={cn(
              "w-full !border-none !bg-black my-4 !text-4xl py-10 px-0 focus-visible:ring-0"
            )}
            type="text"
            placeholder="Your story title"
          />
        </div>
        <Editor />
      </div>
    </EditorContext.Provider>
  );
};
