import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./components/routes/AppRoutes";
import Footer from "./components/shared/Footer";
import { GoldBanner } from "./components/shared/GoldBanner";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavigationProvider } from "./hooks/NavigationProvider";
import { NavBar } from "./layouts/Navbar/NavBar";
import theme from "./theme/theme";

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
