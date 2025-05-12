import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavBar } from "./layouts/NavBar";

import PresistentRoutes from "./components/routes/PresistentRoutes";
import RouteWrapper from "./components/routes/RouteWrapper";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <NavBar />
        <PresistentRoutes />
        <RouteWrapper />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
