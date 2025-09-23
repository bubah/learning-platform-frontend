import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import LoginForm from "../../components/shared/LoginForm";
import SignUp from "../../components/shared/SignUp";
import { useLocation } from "react-router-dom";

const LoginScreen = () => {
  const [authView, setAuthView] = useState("login");

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/sign-up") {
      setAuthView("signup");
    } else if (location.pathname === "/login") {
      setAuthView("login");
    }
  }, [location.pathname]);

  const handleToggleAuthView = () => {
    setAuthView((prevView) => (prevView === "login" ? "signup" : "login"));
  };

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Button onClick={handleToggleAuthView}>
        {authView === "login" ? "Sign Up" : "Login"}
      </Button>
      {authView === "login" ? <LoginForm /> : <SignUp />}
    </Box>
  );
};

export default LoginScreen;
