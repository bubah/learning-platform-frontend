import { Container, Box, Typography, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {  

     const [errors, setErrors] = useState({
        email: "",
        password: "",
      });


      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const email = data.get("email")?.toString().trim() || "";
        const password = data.get("password")?.toString().trim() || "";
    
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
    
        setErrors(tempErrors);
    
        if (isValid) {
          console.log({
            email,
            password,
            remember: data.get("remember"),
          });
        }
      };


    return(
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

        {/* Third-party sign-in */}
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => alert("Third-party Sign-in (e.g., Google)")}
        >
          Sign Up with Google
        </Button>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Email Field */}
          <TextField
            margin="normal"
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

          {/* Password Field */}
          <TextField
            margin="normal"
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

          {/* Remember Me */}
          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
          />

          {/* Submit Button */}
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
    </Container></>
    )
}

export default SignUp;