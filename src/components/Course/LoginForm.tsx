import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginCredentials } from "../../types/types";
import { Navigate, useNavigate } from "react-router-dom";

const credentials = [
  {
    username: "hrazak",
    password: "123",
    role: "student",
  },
  {
    username: "bubahc",
    password: "123",
    role: "teacher",
  },
];

export const LoginForm = ({
  onLogin,
}: {
  onLogin: (User: LoginCredentials) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log("Clicked!");
    const user = credentials.find(
      (u) => u.username == username && u.password == password
    );

    if (user) {
      onLogin(user);
      navigate("/curriculum");

      console.log("Login credentials accepted!");
    } else {
      setError("User not authenticated!");
    }
  }

  return (
    <Box>
      <Box>
        <Box>
          <Typography variant="h2">Login</Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "300px",
          }}
        >
          <TextField
            label="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};
