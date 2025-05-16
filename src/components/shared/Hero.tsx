import { Box, Button, Typography, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import landingImage from "../../assets/hero_learner_right.avif";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "35vh",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 0 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left side: text + buttons */}
          <Box flex={1} textAlign="center">
            <Typography
              variant="h3"
              fontWeight={800}
              color="limegreen"
              sx={{
                fontSize: { xs: "2.2rem", md: "3rem" },
              }}
              gutterBottom
            >
              Learn New Things To <br /> Become More Efficient
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.3rem", md: "2rem" },
                mt: 2,
                color: "#333",
              }}
            >
              Build skills with courses, certificates, and degrees online from
              world-class universities and companies.
            </Typography>

            {/* Buttons with your link logic + modern styling */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4 }}
              justifyContent="center"
            >
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "0.5rem",
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    border: "2px solid transparent",
                    color: "limegreen",
                    fontWeight: 700, // 🔥 upgraded from 500 to 700
                    fontSize: "1rem", // 🔥 slight bump from default (~0.875rem)
                    letterSpacing: "0.5px", // 🔥 subtle premium feel
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "2px solid #228B22",
                      backgroundColor: "rgba(34, 139, 34, 0.1)",
                      color: "#32CD32",
                      fontWeight: 800, // 🔥 heavier bold on hover
                    },
                  }}
                >
                  SIGN UP
                </Button>
              </Link>

              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "0.5rem",
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    border: "2px solid transparent",
                    color: "limegreen",
                    fontWeight: 700, // 🔥 upgraded from 500 to 700
                    fontSize: "1rem", // 🔥 slight bump from default (~0.875rem)
                    letterSpacing: "0.5px", // 🔥 subtle premium feel
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "2px solid #228B22",
                      backgroundColor: "rgba(34, 139, 34, 0.1)",
                      color: "#32CD32",
                      fontWeight: 800, // 🔥 heavier bold on hover
                    },
                  }}
                >
                  LOG IN
                </Button>
              </Link>
            </Stack>
          </Box>

          {/* Right side: image */}
          <Box
            component="img"
            src={landingImage}
            alt="Hero"
            sx={{
              maxWidth: "500px",
              width: "100%",
              borderRadius: 3,
              boxShadow: 3,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
