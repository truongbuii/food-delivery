"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthenticated from "../hooks/useAuthenticated";
import { SnackbarProvider } from "notistack";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const useAuthProvider = () => {
  const [client] = React.useState(new QueryClient());
  useAuthenticated();
  return { client };
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const { client } = useAuthProvider();
  return (
    <SnackbarProvider preventDuplicate maxSnack={1}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
