// src/components/ProductList.tsx
'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={2} justifyContent={'center'}>
      {products.map((product) => (
        <Grid key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;