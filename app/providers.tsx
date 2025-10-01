// app/providers.tsx
"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <Toaster />
        {children}
        <ReactQueryDevtools />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
