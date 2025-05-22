// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  // Delete the HTTP‑only cookie (make sure to match the path and cookie name used during login)
  response.cookies.delete({ name: 'supabase-auth-token', path: '/' });

  return response;
}