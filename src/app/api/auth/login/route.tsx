import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import supabase from '@/infrastructure/supabaseClient';


export async function POST(request: NextRequest) {
  // Parse the incoming JSON body
  const { email, password } = await request.json();

  // Attempt to login with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return NextResponse.json({ error: error?.message || 'Login failed' }, { status: 401 });
  }

  // Create a response that sets an HTTP-only cookie with the access token.
  const response = NextResponse.json({ success: true });
  response.cookies.set('supabase-auth-token', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure usage in production
    path: '/',
    sameSite: 'lax',
    // maxAge: Use the session expiry if available. For example: data.session.expires_in
    maxAge: data.session.expires_in || 3600, // fallback to 1 hour if not provided
  });

  return response;
}