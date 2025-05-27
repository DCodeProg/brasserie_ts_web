// src/app/layout.tsx
import * as React from "react";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import MyAppBar from "@/components/MyAppBar";
import { rye, notoSans } from "@/theme/fonts";

export const metadata = {
  title: "My Next.js & Supabase App",
  description:
    "A cleanly organized Next.js app using Material Design with a dark theme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classNames = `${rye.variable} ${notoSans.variable}`;

  return (
    <html lang="fr">
      <head />
      <body className={classNames}>
        <ClientThemeProvider>
          <MyAppBar />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
