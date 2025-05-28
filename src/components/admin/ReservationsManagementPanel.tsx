"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReservationForm from "./ReservationForm";
import { createClient } from "@/utils/supabase/client";

export interface Reservation {
  id: number;
  etat: string;
  created_at: string;
  client_uid: string | null;
}

export default function ReservationManagementPanel() {
  const supabase = createClient();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);


  const fetchReservations = async () => {
    const { data, error } = await supabase.from("reservations").select("*");
    if (error) console.error(error);
    else setReservations(data as Reservation[]);
  };

  useEffect(() => {
    fetchReservations();
  });

  const handleEdit = (res: Reservation) => {
    setSelectedReservation(res);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) console.error(error);
    else fetchReservations();
  };

  const handleDialogClose = (updated: boolean = false) => {
    setIsDialogOpen(false);
    if (updated) fetchReservations();
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>État</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell>Client UID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell>{res.id}</TableCell>
                <TableCell>{res.etat}</TableCell>
                <TableCell>
                  {new Date(res.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{res.client_uid}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(res)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(res.id)}>
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
          {selectedReservation
            ? "Modifier la réservation"
            : "Ajouter une réservation"}
        </DialogTitle>
        <DialogContent>
          <ReservationForm
            reservation={selectedReservation}
            onClose={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
