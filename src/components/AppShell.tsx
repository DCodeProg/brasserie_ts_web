"use client";

import ClientThemeProvider from "@/components/ClientThemeProvider";
import MyAppBar from "@/components/MyAppBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ClientThemeProvider>
      <MyAppBar />
      {children}
    </ClientThemeProvider>
  );
}