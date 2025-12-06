import { createAuthClient } from "@workspace/auth/better-auth-client";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000/api/auth",
});