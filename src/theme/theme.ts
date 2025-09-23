// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/700.css"; // Bold

const theme = createTheme({
  palette: {
    primary: {
      main: "#156F49",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#DAA520",
      contrastText: "#FFFFFF",
    },
    error: { main: "#D16F6F" },
    background: {
      default: "#ffffffff",
      paper: "#F5F5F5",
    },
    info: { main: "#1E3A5F" },
    success: { main: "#156F49" },
    warning: { main: "#DAA520" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
      fontSize: "1.9rem", // adjust as needed
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
      fontSize: "1.5rem", // adjust as needed
      lineHeight: 1.3,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
      fontSize: "1.25rem", // adjust as needed
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
      fontSize: "1.1rem", // adjust as needed
      lineHeight: 1.4,
      letterSpacing: "0em",
    },
    h5: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
      fontSize: "1rem", // adjust as needed
      lineHeight: 1.4,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
      fontSize: "0.875rem", // adjust as needed
      lineHeight: 1.4,
      letterSpacing: "0em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          // color: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
