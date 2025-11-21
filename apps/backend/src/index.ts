import { router } from "./trpc";
import { authRouter } from "./routers/authRouter";
import { blogRouter } from "./routers/blogRouter";

export const appRouter = router({
    auth: authRouter,
    blog: blogRouter
});

export type AppRouter = typeof appRouter;
