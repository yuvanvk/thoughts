import { Home } from "@/components/blog/home";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await authClient.getSession();
    console.log(session.data?.session);
    
    if (!session.data?.session) {
        redirect("/login");
    }
    return <Home />
}