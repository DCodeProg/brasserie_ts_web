// src/app/layout.tsx
import * as React from "react";
import { rye, notoSans } from "@/theme/fonts";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "Brasserie T&S",
  description:
    "Bienvenue sur le site de la Brasserie T&S, votre destination pour les meilleures bières artisanales.",
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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
