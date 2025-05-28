"use client";

import React, { useState } from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { Reservation } from "./ReservationsManagementPanel";
import { createClient } from "@/utils/supabase/client";

interface ReservationFormProps {
  reservation: Reservation | null;
  onClose: (updated?: boolean) => void;
}

const ETAT_OPTIONS = [
  "en attente",
  "en cours de préparation",
  "préparée",
  "encaissée",
  "annulée",
];

const ReservationForm: React.FC<ReservationFormProps> = ({
  reservation,
  onClose,
}) => {
  const [etat, setEtat] = useState(reservation ? reservation.etat : "");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reservation) {
      // Mise à jour d'une réservation existante
      const { error } = await supabase
        .from("reservations")
        .update({ etat })
        .eq("id", reservation.id).order("id");
      if (error) console.error(error);
      else onClose(true);
    } else {
      // Insertion d'une nouvelle réservation
      const { error } = await supabase.from("reservations").insert([{ etat }]);
      if (error) console.error(error);
      else onClose(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        select
        fullWidth
        label="État"
        value={etat}
        onChange={(e) => setEtat(e.target.value)}
        sx={{ mb: 2 }}
        required
      >
        {ETAT_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        {reservation ? "Enregistrer" : "Ajouter"}
      </Button>
    </Box>
  );
};

export default ReservationForm;
