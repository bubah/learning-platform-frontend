// src/pages/NotFound.tsx
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#f9f9f9",
        px: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "red", mb: 2 }} />

      <Typography
        variant="h1"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "black",
          fontSize: { xs: "4rem", md: "6rem" },
        }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, color: "black" }}>
        Oops! Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{ maxWidth: "400px", mb: 4, color: "black" }}
      >
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back to where you belong.
      </Typography>

      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/"
        sx={{
          textTransform: "none",
          backgroundColor: "limegreen",
          "&:hover": { backgroundColor: "green" },
          fontWeight: 600,
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
