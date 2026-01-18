import { router } from "./trpc";
import { authRouter } from "./routers/auth/authRouter";
import { blogRouter } from "./routers/blog/blogRouter";
import { validRouter } from "./routers/utils/validRouter";

export const appRouter = router({
    auth: authRouter,
    blog: blogRouter,
    valid: validRouter
});

export type AppRouter = typeof appRouter;
