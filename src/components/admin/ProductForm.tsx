"use client";

import React, { useState } from "react";
import type { Product } from "@/types/product";
import { TextField, Button, Box } from "@mui/material";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

interface ProductFormProps {
  product: Product | null;
  onClose: (updated?: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const [nom, setNom] = useState(product ? product.nom : "");
  const [description, setDescription] = useState(
    product ? product.description || "" : ""
  );
  const [prix, setPrix] = useState(product ? product.prix : 0);
  const [volume, setVolume] = useState(product ? product.volume : 0);
  const [quantite, setQuantite] = useState(product ? product.quantite : 0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (product) {
      if (!product.id) {
        setError("Aucun ID produit fourni.");
        return;
      }

      const { data, error } = await supabase
        .from("produits")
        .update({ nom, description, prix, volume, quantite })
        .eq("id", product.id)
        .select().single();

      if (error) {
        setError("Erreur lors de la mise à jour : " + error.message);
        console.error("Update error:", error);
      } else if (!data || data.length === 0) {
        setError(`Aucun produit mis à jour. Vérifiez l'ID.`);
        console.warn("No product updated. Data:", data);
      } else {
        onClose(true);
      }
    } else {
      const { data, error } = await supabase
        .from("produits")
        .insert([{ nom, description, prix, volume, quantite }])
        .select();

      if (error) {
        setError("Erreur lors de l'ajout : " + error.message);
        console.error("Insert error:", error);
      } else {
        onClose(true);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Prix"
        type="number"
        value={prix}
        onChange={(e) => setPrix(parseFloat(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Volume"
        type="number"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Quantité"
        type="number"
        value={quantite}
        onChange={(e) => setQuantite(parseInt(e.target.value))}
        sx={{ mb: 2 }}
      />
      {error && <Box sx={{ color: "red", mb: 2 }}>{error}</Box>}
      <Button type="submit" variant="contained" color="primary">
        {product ? "Enregistrer" : "Ajouter"}
      </Button>
    </Box>
  );
};

export default ProductForm;
