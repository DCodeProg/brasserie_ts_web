// src/app/page.tsx
import React from "react";
import { Container, Typography } from "@mui/material";
import ProductList from "@/components/ProductList";
import type { Product } from "@/types/product";
import { getProducts } from "@/utils/supabase/server";

export default async function HomePage() {
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
