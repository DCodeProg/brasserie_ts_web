"use client";

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import type { Account } from "./AccountManagementPanel";
import { createClient } from "@/utils/supabase/client";

interface AccountFormProps {
  account: Account | null;
  onClose: (updated?: boolean) => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ account, onClose }) => {
  const supabase = createClient();
  const [nom, setNom] = useState(account ? account.nom : "");
  const [prenom, setPrenom] = useState(account ? account.prenom : "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (account) {
      const { error } = await supabase
        .from("utilisateurs")
        .update({ nom, prenom })
        .eq("uid", account.uid);
      if (error) console.error(error);
      else onClose(true);
    } else {
      const { error } = await supabase
        .from("utilisateurs")
        .insert([{ nom, prenom }]);
      if (error) console.error(error);
      else onClose(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        {account ? "Enregistrer" : "Ajouter"}
      </Button>
    </Box>
  );
};

export default AccountForm;
