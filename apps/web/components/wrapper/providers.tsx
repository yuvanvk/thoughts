"use client";

import * as React from "react";
import type { AppRouter } from "@workspace/backend/router";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { Toaster } from "@workspace/ui/components/sonner"
import { TRPCProvider } from "@/lib/trpc";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browerQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browerQueryClient) browerQueryClient = makeQueryClient();
    return browerQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = React.useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <QueryClientProvider client={queryClient}>
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          {children}
          <Toaster position="top-center"/>
        </TRPCProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
