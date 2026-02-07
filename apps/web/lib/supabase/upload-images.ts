import { supabase } from "./supabase-client";

export async function uploadImageToBucket(
  file: File,
  preSignedUrl: string,
  type: string
): Promise<string> {

  const bucket =  type === "profile" ? "user-profile" : "banner-images"
  
  const { error } = await supabase.storage
    .from(bucket)
    .upload(preSignedUrl, file, { cacheControl: "3600", upsert: false });

  if (error) {
    throw new Error(`${error}`);
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(preSignedUrl);

  return data.publicUrl;
}
