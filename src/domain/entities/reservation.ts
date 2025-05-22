import { ReservationProduit } from "./reservation_produit";

export type Reservation = {
  id: number;
  etat: 'en attente' | 'préparée' | 'encaissée' | 'annulée';
  updated_at: string;
  created_at: string;
  client_uid: string | null;
  produits: ReservationProduit[];
};