"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Input } from "@workspace/ui/components/input";
import { ImagePlus } from "lucide-react";
import { Editor } from "./editor";
import { Button } from "@workspace/ui/components/button";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FileUploader } from "@/components/file-upload/file-uploader";
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

  const uploadBanner = (file: File) => {
    
  }

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
        <FileUploader
          accept="image/jpeg"
          maxMBSize={5}
          onFileSelect={(file) => uploadBanner(file)}
        />

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
