import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavigationProvider } from "./hooks/NavigationProvider";
import { NavBar } from "./layouts/Navbar/NavBar";
import AppRoutes from "./components/routes/AppRoutes";

// Theme provider
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
    error: { main: "#FF0000" },
    background: {
      default: "#F5F5F5",
      paper: "#F5F5F5",
    },
    info: { main: "#1E3A5F" },
    success: { main: "#156F49" },
    warning: { main: "#DAA520" },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <ThemeProvider theme={theme}>
          {/* <GoldBanner /> */}
          <NavigationProvider>
            <NavBar />
          </NavigationProvider>
          <AppRoutes />
          {/* <Footer /> */}
        </ThemeProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
