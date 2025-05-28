import * as React from "react";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import MyAppBar from "@/components/MyAppBar";
import { rye, notoSans } from "@/theme/fonts";
import Link from "next/link";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClientThemeProvider>
      {/* Admin Navigation */}
      <AdminNav />
      {children}
    </ClientThemeProvider>
  );
}