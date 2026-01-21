"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Input } from "@workspace/ui/components/input";
import { Editor } from "./editor";
import { Button } from "@workspace/ui/components/button";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUploader } from "@/components/file-upload/file-uploader";
import { useEditor, EditorContext } from "@tiptap/react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Loader2, Save, Send, Trash } from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "@workspace/ui/components/separator";
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
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const trpc = useTRPC();
  const publishMutation = useMutation(trpc.blog.create.mutationOptions());

  if (!editor) {
    return null;
  }

  const handlePublish = async () => {
    try {
      if (!title?.trim()) {
        toast.error("Please provide title");
        return;
      }

      if (editor?.isEmpty) {
        toast.error("The content is empty. Please provide some content");
        return;
      }

      const response = await publishMutation.mutateAsync({
        title,
        description: editor.getHTML(),
        image: publicUrl,
      });

      if (response.status !== 200) {
        toast.error(response.message);
      }

      toast.success(response.message);
      router.push("/home");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <EditorContext.Provider value={providerValue}>
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)"
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)"
        }}
        transition={{
          duration: 0.3,
          ease: "linear"
        }}
        className="flex flex-col px-4 max-w-3xl mx-auto mt-5 xl:mt-16 h-[88vh]">

        <FileUploader
          accept="image/jpeg"
          maxMBSize={5}
          onFileUpload={setPublicUrl}
        />

        <div>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "w-full border-none! dark:bg-neutral-900! my-4 !text-4xl py-10 px-0 focus-visible:ring-0 shadow-none"
            )}
            type="text"
            placeholder="Your story title"
          />
        </div>
        <Editor />
        <div className={cn("flex items-center justify-between fixed bottom-3 left-1/2 -translate-x-1/2",
          "max-w-lg w-full bg-neutral-800 px-2 py-2 rounded-full"
        )}>
          <div className={cn("flex items-center gap-x-1")}>
            <Button
              onClick={handlePublish}
              className={cn(
                "rounded-full bg-rose-500 text-white cursor-pointer px-3! py-4!",
                "hover:bg-rose-800 border border-rose-300"
              )}
              size={"sm"}
            >
              {publishMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Trash />
                  <span>Delete</span>
                </>

              )}
            </Button>
            <div className="w-px h-7 bg-neutral-700 ml-1" />
          </div>

          <Button
            size={"sm"}
            className={cn("bg-transparent text-white",
              "hover:bg-neutral-700 rounded-[9px] cursor-pointer"
            )}
          >
            <Save />
            Save
          </Button>

          <Button
            size={"sm"}
            className={cn("bg-transparent text-white",
              "hover:bg-neutral-700 rounded-[9px] cursor-pointer"
            )}
          >
            <Eye />
            Preview
          </Button>

          <div className={cn("flex items-center gap-x-1")}>
            <div className="w-px h-7 bg-neutral-700 mr-1" />
            <Button
              onClick={handlePublish}
              className={cn(
                "rounded-full bg-lime-500 text-black cursor-pointer px-3! py-4!",
                "hover:bg-lime-600 border border-lime-300"
              )}
              size={"sm"}
            >
              {publishMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Send />
                  <span>Publish</span>
                </>

              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </EditorContext.Provider>
  );
};
