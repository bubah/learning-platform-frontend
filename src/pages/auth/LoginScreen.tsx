import { useState } from "react";
import { Button } from "@mui/material";
import LoginForm from "../../components/shared/LoginForm";
import SignUp from "../../components/shared/SignUp";

const LoginScreen = () => {
  const [authView, setAuthView] = useState("login");

  const handleToggleAuthView = () => {
    setAuthView((prevView) => (prevView === "login" ? "signup" : "login"));
  };

  return (
    <>
      <Button onClick={handleToggleAuthView}>
        {authView === "login" ? "Sign Up" : "Login"}
      </Button>
      {authView === "login" ? <LoginForm /> : <SignUp />}
    </>
  );
};

export default LoginScreen;
