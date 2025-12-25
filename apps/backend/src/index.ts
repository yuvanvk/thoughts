import { router } from "./trpc";
import { authRouter } from "./routers/authRouter";
import { blogRouter } from "./routers/blogRouter";
import { validRouter } from "./routers/validRouter";

export const appRouter = router({
    auth: authRouter,
    blog: blogRouter,
    valid: validRouter
});

export type AppRouter = typeof appRouter;
