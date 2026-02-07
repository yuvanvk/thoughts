import { router } from "./trpc";
import { authRouter } from "./routers/auth/auth-router";
import { blogRouter } from "./routers/blog/blog-router";
import { validRouter } from "./routers/utils/valid-router";
import { searchRouter } from "./routers/search/search-router";
import { userRouter } from "./routers/user/user-router";

export const appRouter = router({
    auth: authRouter,
    blog: blogRouter,
    valid: validRouter,
    search: searchRouter,
    user: userRouter,
});

export type AppRouter = typeof appRouter;
