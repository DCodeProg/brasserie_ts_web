"use client";

import React, { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductForm from "./ProductForm";
import { createClient } from "@/utils/supabase/client";

export default function ProductManagementPanel() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("produits").select("*");
    if (error) console.error(error);
    else setProducts(data as Product[]);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("produits").delete().eq("id", id);
    if (error) console.error(error);
    else fetchProducts();
  };

  const handleDialogClose = (updated: boolean = false) => {
    setIsDialogOpen(false);
    if (updated) fetchProducts();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Ajouter un produit
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>{prod.nom}</TableCell>
                <TableCell>{prod.description}</TableCell>
                <TableCell>{prod.prix}</TableCell>
                <TableCell>{prod.volume}</TableCell>
                <TableCell>{prod.quantite}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(prod)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(prod.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isDialogOpen} onClose={() => handleDialogClose()}>
        <DialogTitle>
          {selectedProduct ? "Modifier le produit" : "Ajouter un produit"}
        </DialogTitle>
        <DialogContent>
          <ProductForm product={selectedProduct} onClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
