import { UserBlogs } from "@/components/blog/user-blogs";
import { auth } from "@workspace/auth/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyBlogPage() {
    const data = await auth.api.getSession({
        headers: await headers(),
    })

    if(!data?.session) {
        redirect("/login")
    }

    return <UserBlogs />
}