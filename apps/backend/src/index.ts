import { router } from "./trpc";
import { authRouter } from "./routers/authRouter";

const appRouter = router({
    auth: authRouter
});

export type AppRouter = typeof appRouter;
