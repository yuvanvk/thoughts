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
import { Loader2 } from "lucide-react";
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
      <div className="flex flex-col px-4 max-w-3xl mx-auto mt-5 xl:mt-16 h-[88vh]">
        
        <FileUploader
          accept="image/jpeg"
          maxMBSize={5}
          onFileUpload={setPublicUrl}
        />

        <div>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "w-full !border-none !bg-neutral-900 my-4 !text-4xl py-10 px-0 focus-visible:ring-0"
            )}
            type="text"
            placeholder="Your story title"
          />
        </div>
        <Editor />
        <div className={cn("flex items-center justify-between pb-5")}>
          <Button
            onClick={() => router.push("/home")}
            className={cn("rounded-[8px] cursor-pointer")}
            size={"sm"}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            className={cn(
              "rounded-[8px] bg-lime-700 text-white cursor-pointer",
              "hover:bg-lime-800"
            )}
            size={"sm"}
          >
            {publishMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </div>
    </EditorContext.Provider>
  );
};
