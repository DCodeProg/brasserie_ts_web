export interface Product {
  id: string;
  nom: string;
  description?: string;
  prix: number;
  categorie?: string;
  image_url?: string;
  volume: number;
  degre?: number;
  quantite: number;
}
