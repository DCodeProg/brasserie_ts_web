"use client";
import Link from "next/link";
import { Box, AppBar, Toolbar, Button } from "@mui/material";

export default function AdminNav() {
  return (
    <AppBar position="static" color="default" sx={{ mb: 2 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button component={Link} href="/admin/produits" color="inherit">
            Produits
          </Button>
          <Button component={Link} href="/admin/reservations" color="inherit">
            Réservations
          </Button>
          <Button component={Link} href="/admin/comptes" color="inherit">
            Comptes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}