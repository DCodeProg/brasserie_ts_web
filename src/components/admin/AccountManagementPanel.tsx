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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountForm from "./AccountForm";
import { createClient } from "@/utils/supabase/client";

export interface Account {
  uid: string;
  nom: string;
  prenom: string;
}

export default function AccountManagementPanel() {
  const supabase = createClient();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const { data, error } = await supabase.from("utilisateurs").select("*");
    if (error) console.error(error);
    else setAccounts(data as Account[]);
  };

  const handleAdd = () => {
    setSelectedAccount(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  const handleDelete = async (uid: string) => {
    const { error } = await supabase
      .from("utilisateurs")
      .delete()
      .eq("uid", uid);
    if (error) console.error(error);
    else fetchAccounts();
  };

  const handleDialogClose = (updated: boolean = false) => {
    setIsDialogOpen(false);
    if (updated) fetchAccounts();
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((acc) => (
              <TableRow key={acc.uid}>
                <TableCell>{acc.uid}</TableCell>
                <TableCell>{acc.nom}</TableCell>
                <TableCell>{acc.prenom}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(acc)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(acc.uid)}>
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
          {selectedAccount ? "Modifier le compte" : "Ajouter un compte client"}
        </DialogTitle>
        <DialogContent>
          <AccountForm account={selectedAccount} onClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
