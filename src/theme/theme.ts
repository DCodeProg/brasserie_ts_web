// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

// Optional: If you want proper TypeScript support for a new "tertiary" color, add module augmentation:
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: { main: string };
  }
  interface PaletteOptions {
    tertiary?: { main: string };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#ceca74", // your primary color
    },
    secondary: {
      main: "#cbc8a4", // your secondary color
    },
    tertiary: {
      main: "#a5d0bb", // your custom tertiary color
    },
    error: {
      main: "#ffb4ab", // your error color
    },
  },
  typography: {
    fontFamily: "Noto Sans, sans-serif", // Default body font
    h1: {
      fontFamily: "Rye, cursive", // Display font for headings
    },
    h2: {
      fontFamily: "Rye, cursive",
    },
    h5: {
      fontFamily: "Rye, cursive",
    },
    // Customize further typographic variants as needed.
  },
});

export default theme;
