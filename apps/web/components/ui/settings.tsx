"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { FileUploader } from "@/components/file-upload/file-uploader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Settings = () => {
  const router = useRouter();
  const trpc = useTRPC();

  const [settings, setSettings] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const userSettingsMutation = useMutation(trpc.user.save.mutationOptions({
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (data) => {
      toast.error(data.message)
    }
  }));

  const handleSave = async () => {
    try {
      if(!publicUrl && !settings.password) {
        return
      }

      await userSettingsMutation.mutateAsync({
        imageUrl: publicUrl!
      })

    } catch (error: any) {
      toast.error(`${error.message}`)
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(10px)"
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)"
      }}
      
    >
      <div className="px-16 py-4 flex flex-col font-sans">
        <div className="space-y-3">
          <div>
            <div className="text-2xl font-medium">Settings</div>
            <div className="text-xs text-neutral-400 font-normal">
              Manage your account and preferences
            </div>
          </div>
          <FileUploader type={"profile"} accept="image/*" onFileUpload={setPublicUrl}  maxMBSize={5} className="w-30 h-30 mx-auto rounded-full"/>
          <div className="my-10 space-y-10">
            <div className="space-y-2">
              <Label
                htmlFor="firstname"
                className={cn("font-medium  text-white")}
              >
                First name
              </Label>
              <Input
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    firstName: e.target.value,
                  });
                }}
                placeholder="Yuvan"
                className={cn(
                  "rounded-[10px] border",
                  "dark:bg-neutral-800 dark:border-neutral-700"
                )}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lastname"
                className={cn("font-medium  text-white")}
              >
                Last name
              </Label>
              <Input
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    lastName: e.target.value,
                  })
                }
                placeholder="Kappala"
                className={cn(
                  "rounded-[10px] border",
                  "dark:bg-neutral-800 dark:border-neutral-700"
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className={cn("font-medium  text-white")}>
                Email
              </Label>
              <Input
                disabled
                value={"abhivigneshofficial@gmail.com"}
                className={cn(
                  "rounded-[10px] border",
                  "dark:bg-neutral-800 dark:border-neutral-700"
                )}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={cn("font-medium  text-white")}
              >
                Password
              </Label>
              <Input
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    password: e.target.value,
                  })
                }
                placeholder="*****"
                className={cn(
                  "rounded-[10px] border",
                  "dark:bg-neutral-800 dark:border-neutral-700"
                )}
              />
              <div className="text-right underline text-xs  text-neutral-200 cursor-pointer">
                Change password
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Button
                onClick={() => router.push("/home")}
                size={"sm"}
                className={cn("rounded-[10px] shadow px-5 py-2 cursor-pointer")}
              >
                Back
              </Button>
              <Button
                onClick={handleSave}
                size={"sm"}
                className={cn(
                  "text-white rounded-[10px] shadow px-5 py-2 cursor-pointer",
                  "bg-green-600 hover:bg-green-700"
                )}
              >
                {userSettingsMutation.isPending ? <Loader2 className="animate-spin" size={10} /> : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
