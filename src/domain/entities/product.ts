export type Product = {
  id: string;
  nom: string;
  description: string | null;
  prix: number;
  categoryId: string | null;
  imageUrl: string;
  volume: number;
  degree: number | null;
  quantite: number;
};