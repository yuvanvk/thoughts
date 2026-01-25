"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Input } from "@workspace/ui/components/input";
import { Editor } from "./editor";
import { Button } from "@workspace/ui/components/button";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileUploader } from "@/components/file-upload/file-uploader";
import { useEditor, EditorContext } from "@tiptap/react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Loader2, Save, Send, Trash, X } from "lucide-react";
import { motion } from "motion/react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import Image from "next/image";

export const BlogWriting = () => {
  const trpc = useTRPC();
  const params = useParams();
  const { id } = params;

  const { isFetching, isError, data } = useQuery(trpc.blog.get.queryOptions({ id } as { id: string }));

  const router = useRouter();
  const [publicUrl, setPublicUrl] = useState<string | null>(data?.blog.imageUrl || null,);
  const [title, setTitle] = useState<string>(data?.blog.title || "");
  const [isImageUploaded, setIsImageUploaded] = useState(data?.blog.imageUrl ? true : false);

  const publishMutation = useMutation(trpc.blog.publish.mutationOptions());
  const deleteMutation = useMutation(trpc.blog.deleteDraft.mutationOptions());
  const saveMutation = useMutation(trpc.blog.save.mutationOptions());

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
    content: data?.blog.description || "<p>Share your thoughts</p>",
    immediatelyRender: false,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "outline-none h-64",
      },
    },
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (isError) {
    toast.error(data?.message);
    router.push("/home");
    return;
  }

  if (!editor) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const response = await deleteMutation.mutateAsync({ id } as { id: string });
      toast.success(response.messsage)
      router.push("/drafts")
      return
    } catch (error: any) {
      toast.error(`${error.message}`)
    }
  }

  const handleSave = async () => {
    try {
      if(!id) {
        toast.error("No valid id found")
        return
      }
      
      if(!title) {
        toast.error("Please provide a title")
        return
      }
      console.log(title, editor.getHTML(), id, publicUrl);
      

      const response = await saveMutation.mutateAsync({ 
        id: id as string,
        title,
        content: editor.getHTML(),
        imageUrl: publicUrl,
      })

      toast.success(response.message)
    } catch (error: any) {
      toast.error(`${error.message}`)
    }
  }

  const handlePublish = async () => {
    try {
      if (!title?.trim()) {
        toast.error("Please provide title");
        return;
      }

      if (!id) {
        toast.error("No valid id found");
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
        id: id as string,
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
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        className="flex flex-col px-4 max-w-3xl mx-auto mt-5 xl:mt-16 h-[88vh]"
      >
        {isImageUploaded && (
          <div className={cn("w-full h-72 relative")}>
            {isFetching ? (
              <Skeleton />
            ) : (
              <>
                <Image
                  src={data?.blog.imageUrl!}
                  alt={data?.blog.imageUrl!}
                  fill
                  className={cn("object-cover rounded-2xl")}
                />
                <div
                  className={cn(
                    "p-1 bg-rose-500 absolute top-2 right-4 rounded-[9px]",
                  )}
                >
                  <X onClick={() => setIsImageUploaded(false)} />
                </div>
              </>
            )}
          </div>
        )}

        {!isImageUploaded && (
          <FileUploader
            accept="image/jpeg"
            maxMBSize={5}
            previewUrl={data?.blog.imageUrl}
            onFileUpload={setPublicUrl}
          />
        )}

        <div>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "w-full border-none! dark:bg-neutral-900! my-4 !text-4xl py-10 px-0 focus-visible:ring-0 shadow-none",
            )}
            value={title}
            type="text"
            placeholder="Your story title"
          />
        </div>
        <Editor />
        <div
          className={cn(
            "flex items-center justify-between fixed bottom-18 md:bottom-3 left-1/2 -translate-x-1/2",
            "max-w-[400px] md:max-w-lg w-full bg-neutral-100 dark:bg-neutral-800 px-2 py-2 rounded-full shadow",
          )}
        >
          <div className={cn("flex items-center gap-x-1")}>
            <Button
              onClick={handleDelete}
              className={cn(
                "rounded-full bg-rose-500 text-white cursor-pointer px-3! py-4!",
                "hover:bg-rose-600 border border-rose-300",
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
            <div className="w-px h-7 bg-neutral-300 dark:bg-neutral-700 ml-1" />
          </div>

          <Button
            onClick={handleSave}
            size={"sm"}
            className={cn(
              "bg-transparent text-black dark:text-white",
              "hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-[9px] cursor-pointer shadow-none",
            )}
          >
            <Save />
            Save
          </Button>

          <Button
            size={"sm"}
            className={cn(
              "bg-transparent text-black dark:text-white",
              "hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-[9px] cursor-pointer shadow-none",
            )}
          >
            <Eye />
            Preview
          </Button>

          <div className={cn("flex items-center gap-x-1")}>
            <div className="w-px h-7 bg-neutral-300 dark:bg-neutral-700 mr-1" />
            <Button
              onClick={handlePublish}
              className={cn(
                "rounded-full bg-lime-500 text-black cursor-pointer px-3! py-4!",
                "hover:bg-lime-600 border border-lime-300",
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
