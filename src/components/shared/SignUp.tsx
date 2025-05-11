import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthenticationProvider";

const SignUp = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    if (email !== confirmEmail) {
      tempErrors.email = "Email addresses do not match";
      isValid = false;
    }
    if (password !== confirmPassword) {
      tempErrors.password = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      console.log({
        email,
        password,
      });
      signUp({ username: email, password });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" color="primary">
            Sign Up
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => alert("Third-party Sign-in (e.g., Google)")}
          >
            Sign Up with Google
          </Button>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
              fullWidth
              id="email-confirm"
              label="Confirm Email Address"
              name="email-confirm"
              autoComplete="email"
              autoFocus
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
