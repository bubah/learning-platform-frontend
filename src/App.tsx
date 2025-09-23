import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavigationProvider } from "./hooks/NavigationProvider";
import { NavBar } from "./layouts/Navbar/NavBar";
import AppRoutes from "./components/routes/AppRoutes";
import { GoldBanner } from "./components/shared/GoldBanner";
import Footer from "./components/shared/Footer";
import theme from "./theme/theme";

// Theme provider

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <ThemeProvider theme={theme}>
          <GoldBanner />
          <NavigationProvider>
            <NavBar />
          </NavigationProvider>
          <AppRoutes />
          <Footer />
        </ThemeProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
