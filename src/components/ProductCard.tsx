"use client";

import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Stack, SvgIcon } from "@mui/material";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PercentIcon from "@mui/icons-material/Percent";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const name = product.nom || "Nom du produit inconnu";
  const description =
    product.description || "Aucune description disponible.";
  const price =
    typeof product.prix === "number"
      ? `${product.prix.toFixed(2)}€`
      : "Prix non disponible";
  const degre =
    typeof product.degre === "number"
      ? `${product.degre.toFixed(1)}%`
      : "N/A";
  const volume =
    typeof product.volume === "number"
      ? `${product.volume}cl`
      : "N/A";
  const stock =
    typeof product.quantite === "number"
      ? `${product.quantite}`
      : "N/A";

  const hasImage = Boolean(product.image_url);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "stretch",
        boxShadow: 3,
        borderRadius: 2,
        maxWidth: 500,
        minHeight: 180,
      }}
    >
      {hasImage ? (
        <CardMedia
          component="img"
          image={product.image_url}
          alt={name}
          sx={{
            width: 180,
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px 0 0 8px",
          }}
        />
      ) : (
        <Box
          sx={{
            width: 180,
            height: "100%",
            minHeight: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.900",
            borderRadius: "8px 0 0 8px",
          }}
        >
          <SvgIcon component={ImageNotSupportedIcon} sx={{ fontSize: 64, color: "grey.400" }} />
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign={"justify"} sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Box display="flex" alignItems="center">
              <PercentIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{degre}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LocalDrinkIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{volume}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Inventory2Icon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{stock}</Typography>
            </Box>
          </Stack>
          <Typography variant="subtitle1" color="primary" fontWeight={700}>
            {price}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard;
