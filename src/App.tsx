import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavBar } from "./layouts/NavBar";
import AppRoutes from "./components/routes/AppRoutes";
import Footer from "./components/shared/Footer";
import { createTheme, ThemeProvider } from "@mui/material";
import { NavigationProvider } from "./hooks/NavigationProvider";

// Theme provider
const theme = createTheme({
  palette: {
    primary: {
      main: "#156F49",
    },
    secondary: {
      main: "#DAA520",
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
          {/* <AppRoutes /> */}
          {/* <Footer /> */}
        </ThemeProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
