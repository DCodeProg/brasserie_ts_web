import * as React from "react";
import ClientThemeProvider from "@/components/ClientThemeProvider";
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