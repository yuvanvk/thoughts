import { supabase } from "./supabase-client";

export async function uploadBannerImage(file: File, preSignedUrl: string): Promise<string> {
    const { error } = await supabase.storage.from("banner-images").upload(preSignedUrl, file, { cacheControl: '3600', upsert: false })

    if(error) {
        throw new Error(`${error}`)
    }

    const { data } = supabase.storage.from("banner-images").getPublicUrl(preSignedUrl)
    console.log(data.publicUrl)
    return data.publicUrl
}