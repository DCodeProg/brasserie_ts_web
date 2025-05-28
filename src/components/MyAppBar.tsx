"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const MyAppBar: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const supabase = createClient();

  const fetchUserName = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("utilisateurs")
        .select("prenom")
        .eq("uid", userId)
        .single();
      setUserName(data && !error ? data.prenom : null);
    },
    [supabase]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchSessionAndUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(session);
      if (session?.user?.id) {
        fetchUserName(session.user.id);
      } else {
        setUserName(null);
      }
    };

    fetchSessionAndUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;
        setSession(session);
        if (session?.user?.id) {
          fetchUserName(session.user.id);
        } else {
          setUserName(null);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.subscription?.unsubscribe();
    };
  }, [supabase, fetchUserName]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserName(null);
  }, [supabase]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Image
          src="/brasserie_logo.png"
          alt="Brasserie T&S Logo"
          width={40}
          height={40}
          style={{ marginRight: 16 }}
          priority
        />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Brasserie T&S
        </Typography>
        {session ? (
          <>
            {userName && (
              <Typography sx={{ mr: 2 }}>{userName}</Typography>
            )}
            <Link href="/admin">
              <Button color="inherit">
                Admin
              </Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button color="inherit">
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
