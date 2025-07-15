// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Cairo, sans-serif", // 🔥 This sets default font across your app
  },
  palette: {
    primary: {
      main: "#0B3D2E", // optional: your deep green
    },
    secondary: {
      main: "#FFD700", // optional: gold
    },
  },
});

export default theme;
