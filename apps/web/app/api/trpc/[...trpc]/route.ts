import { appRouter } from "@workspace/backend/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";


export const handler = (req: NextRequest) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
    })
}

export { handler as GET, handler as POST };