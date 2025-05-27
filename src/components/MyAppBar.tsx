// src/components/MyAppBar.tsx
"use client";

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

const MyAppBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Image
          src="/brasserie_logo.png"
          alt="Brasserie T&S Logo"
          width={40}
          height={40}
          style={{ marginRight: 16 }}
        />
        <Typography variant="h5" noWrap component="div">
          Brasserie T&S
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
