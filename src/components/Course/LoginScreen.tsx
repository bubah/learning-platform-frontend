import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";
import { Button } from "@mui/material";

const LoginScreen = () => {
  const [authView, setAuthView] = useState("login");


  const handleToggleAuthView = () => {
    setAuthView((prevView) => (prevView === "login" ? "signup" : "login"));
  }

  return <>
  
  <Button
  onClick = {handleToggleAuthView}
  >{authView === "login" ? "Sign Up" : "Login" }</Button>
  {authView === "login" ? <LoginForm /> : <SignUp />}</>;
};

export default LoginScreen;
