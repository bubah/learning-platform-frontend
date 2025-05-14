import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavBar } from "./layouts/NavBar";
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <NavBar />
        <AppRoutes />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
