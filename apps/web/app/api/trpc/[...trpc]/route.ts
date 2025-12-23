import { appRouter } from "@workspace/backend/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";
import { auth } from "@workspace/auth/better-auth";

export const handler = async (req: NextRequest) => {

    const session = await auth.api.getSession({ headers: req.headers });
    
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({ session })
})}

export { handler as GET, handler as POST };