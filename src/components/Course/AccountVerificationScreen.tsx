import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import { CognitoUser, userPool } from "../../auth/cognitoConfig";
import { useAuth } from "./AuthenticationProvider";


const VerificationComponent = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { login, email } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    if (email === null) {
      setError("User not found. Please sign up again.");
      return;
    }
    try {
      const response = await verifyCode(email, code);

      if (response.success) {
        setSuccess(true);

        login({ username: email, password: password });
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Error during verification:", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (
    email: string,
    code: string
  ): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error("❌ Verification failed:", err);
          return resolve({ success: false, message: err.message });
        }

        console.log("✅ Verification successful:", result);
        resolve({ success: true });
      });
    });
  };


const resendConfirmationCode = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error("❌ Resend code failed:", err);
        return reject(err);
      }
      console.log("✅ Code resent:", result);
      resolve();
    });
  });
};

const handleResendCode = async () => {
  try {
    setLoading(true);
    console.log("Resending code...", email);
    await resendConfirmationCode(); 
    setSuccessMessage("A new code has been sent to your email.");
  } catch (err) {
    setError("Failed to resend verification code. Try again later.");
    console.error("Error during resend code:", err);
  } finally {
    setLoading(false);
  }
};

console.log("Email:", email);

  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Verify Your Account
      </Typography>

      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          Your account has been verified successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Enter Verification Code"
        variant="outlined"
        fullWidth
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Enter Password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={code.length === 0}
            >
              Verify
            </Button>
          )}
           <Button
              variant="contained"
              onClick={handleResendCode}
              disabled={code.length === 0}
            >
              Resend Code
            </Button>
            {successMessage && (
              <Alert severity="success" sx={{ marginTop: 2 }}>
                {successMessage}
              </Alert>
            )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VerificationComponent;
