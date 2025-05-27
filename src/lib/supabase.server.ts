import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only function to fetch products from the "produits" table.
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("produits").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data as Product[];
}
