import supabase from "@/infrastructure/supabaseClient";
import { Product } from "@/domain/entities/product";

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("produits")
    .select("*");

  if (error) {
    throw error;
  }

  return data as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("produits")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as Product | null;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const { data, error } = await supabase
    .from("produits")
    .insert([product])
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
};

export const updateProduct = async (id: string, updatedField: Partial<Product>): Promise<Product> => {
  const { data, error } = await supabase
    .from("produits")
    .update(updatedField)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("produits")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};