// app/manage/layout.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
// Import MUI providers
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../../theme';

export default async function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can add an authentication check here (using cookies or middleware)
  // For brevity, we assume the user is authenticated.
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ padding: '1rem' }}>
        <nav style={{ marginBottom: '2rem' }}>
          <a href="/manage/products" style={{ marginRight: '1rem' }}>
            Manage Products
          </a>
          <a href="/manage/stocks" style={{ marginRight: '1rem' }}>
            Manage Stocks
          </a>
          <a href="/manage/clients" style={{ marginRight: '1rem' }}>
            Manage Clients
          </a>
          <a href="/manage/orders" style={{ marginRight: '1rem' }}>
            Manage Orders
          </a>
          {/* Optionally, add the Logout button here */}
        </nav>
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}