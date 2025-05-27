// src/app/page.tsx
import React from "react";
import { Container, Typography } from "@mui/material";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/supabase.server";
import type { Product } from "@/types/product";

export default async function HomePage() {
  // Fetch products on the server.
  const products: Product[] = await getProducts();

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Nos produits
      </Typography>
      <ProductList products={products} />
    </Container>
  );
}
