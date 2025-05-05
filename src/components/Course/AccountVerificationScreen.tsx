import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, CircularProgress, Box, Grid } from '@mui/material';

const VerificationComponent = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate verification request (replace this with actual API call)
      const response = await verifyCode(code);

      if (response.success) {
        setSuccess(true);
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Simulated API call function
  const verifyCode = async (code: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: code === '123456' }); // Replace with real verification logic
      }, 2000);
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', padding: 3 }}>
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

      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={handleSubmit} disabled={code.length === 0}>
              Verify
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VerificationComponent;
