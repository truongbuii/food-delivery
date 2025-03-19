"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthenticated from "../hooks/useAuthenticated";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { AddonsProvider } from "@/contexts/AddonsContext";
import { CartProvider } from "@/contexts/CartContext";
import { CircleX } from "lucide-react";

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
  const { theme } = useTheme();
  return (
    <SnackbarProvider
      preventDuplicate
      maxSnack={1}
      action={(snackbarId) => (
        <button onClick={() => closeSnackbar(snackbarId)}>
          <CircleX />
        </button>
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={client}>
          <CartProvider>
            <AddonsProvider>{children}</AddonsProvider>
          </CartProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
