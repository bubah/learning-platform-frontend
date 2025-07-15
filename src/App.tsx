import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavBar } from "./layouts/NavBar";
import AppRoutes from "./components/routes/AppRoutes";
import { GoldBanner } from "./components/shared/GoldBanner";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <GoldBanner />
        <NavBar />
        <AppRoutes />
        <Footer />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
