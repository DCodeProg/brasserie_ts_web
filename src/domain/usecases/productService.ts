import { getProducts } from "@/infrastructure/productsRepository";
import { Product } from "../entities/product";

export const listProducts = async (): Promise<Product[]> => {
  return await getProducts();
}

export const getProductById = async (id: number): Promise<Product | null> => {
  return await getProductById(id);
}

export const addProduct = async (product: Product): Promise<Product> => {
  return await addProduct(product);
}

export const updateProduct = async (product: Partial<Product>): Promise<Product> => {
  return await updateProduct(product);
}

export const deleteProduct = async (id: number): Promise<void> => {
  return await deleteProduct(id);
}