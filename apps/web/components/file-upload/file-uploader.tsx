"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { ImagePlus, Loader2Icon, Upload, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { uploadBannerImage } from "@/lib/supabase/upload-banner-images";

interface FileUploaderProps {
  accept: string;
  maxMBSize: number;
  onFileUpload: Dispatch<SetStateAction<string | null>>;
}

export const FileUploader = ({
  accept = "image/*",
  maxMBSize = 5,
  onFileUpload,
}: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setUploading] = useState(false);

  const trpc = useTRPC();

  const uploadMutation = useMutation(trpc.valid.create.mutationOptions());

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const maxByteSize = maxMBSize * 1024 * 1024;
    if (selectedFile.size > maxByteSize) {
      toast.error("The file should be less than 5MB");
      return;
    }

    setFile(selectedFile);
  };

  const uploadBanner = async (file: File) => {
    if (!file) {
      return;
    }
    try {
      setUploading(true);

      const data = await uploadMutation.mutateAsync({
        size: file.size,
        type: file.type,
        name: file.name,
      });

      if (data.status !== 200 && !data.preSignedUrl) {
        toast.error(data.message);
        return;
      }

      const publicUrl = await uploadBannerImage(file, data.preSignedUrl!);
      onFileUpload(publicUrl);
      toast.success("Uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "group h-64 bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center space-y-2 w-full border-2 border-dashed cursor-pointer rounded-2xl relative",
          "border-2 border-dashed hover:border-neutral-300 dark:hover:border-neutral-700",
          "transition-all duration-200"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center border border-neutral-300 dark:border-neutral-800 rounded-[10px] p-4 duration-200",
            "group-hover:shadow-neutral-600/70 shadow-xs"
          )}
        >
          <ImagePlus
            size={20}
            className={cn(
              "text-neutral-400 group-hover:text-neutral-500 dark:text-neutral-500 group-dark:hover:text-neutral-300",
              "duration-200 transition-all"
            )}
          />
        </div>
        <p className={cn("text-[12px] font-sans text-neutral-400")}>
          Add a cover Image
        </p>
        {file && file.type.startsWith("image/") && previewUrl && (
          <>
            <img
              src={previewUrl}
              alt="preview"
              className="absolute inset-0 h-64 w-full object-cover object-center rounded-2xl"
            />
            <div className="flex items-center gap-x-2 absolute z-10 top-2 right-2">
              <Button
                disabled={isUploading}
                onClick={(e) => {
                  e.stopPropagation();
                  uploadBanner(file);
                }}
                className="!bg-blue-500 rounded-[10px] cursor-pointer"
                variant={"ghost"}
              >
                {isUploading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <div className="flex items-center gap-x-2">
                    Upload
                    <Upload />
                  </div>
                )}
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);

                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
                className="!bg-rose-500 rounded-[10px] cursor-pointer"
                variant={"destructive"}
              >
                <X />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
