"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface FileUploaderProps {
  accept: string;
  maxMBSize: number;
  onFileSelect: (file: File) => void;
}

export const FileUploader = ({
  accept = "image/*",
  maxMBSize = 5,
  onFileSelect,
}: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if(!file) {
        setPreviewUrl(null)
        return
    }

    const previewUrl = URL.createObjectURL(file)
    setPreviewUrl(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [file])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const maxByteSize = maxMBSize * 1024 * 1024;
    if (selectedFile.size > maxByteSize) {
      toast.error("The file should be less than 5MB");
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
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
          "group h-64 bg-neutral-900 flex flex-col items-center justify-center space-y-2 w-full border-2 border-dashed cursor-pointer rounded-2xl relative",
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
        {file && file.type.startsWith("image/") && previewUrl && (
          <>
            <img
              src={previewUrl}
              alt="preview"
              className="absolute inset-0 h-64 w-full object-cover object-center rounded-2xl"
            />
            <Button
              onClick={(e) => {
                e.stopPropagation()
                setFile(null)

                if(inputRef.current) {
                    inputRef.current.value = "";
                }
              }}  
              className="absolute z-10 top-2 right-2 !bg-rose-500 rounded-[10px]"
              variant={"destructive"}
            >
              <X />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
