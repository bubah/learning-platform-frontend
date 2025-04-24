import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useAuth } from "./AuthenticationProvider";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    login({ username, password });
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
