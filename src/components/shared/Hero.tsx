import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import landingImage from "../../assets/hero_landing_image.avif";

const Hero = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              textAlign: "center",
              fontSize: "3rem",
              marginTop: "1rem",
              color: "#333",
            }}
          >
            Learn New Things To
            <br />
            Become More Efficient
          </Typography>

          <Typography
            variant="h4"
            component="h3"
            sx={{
              textAlign: "center",
              fontSize: "3rem",
              marginTop: "2rem",
              color: "#333",
            }}
          >
            Build skills with courses, certificates, and degrees online from
            world-class universities and companies.
          </Typography>

          {/* CREATE AN ACCOUNT */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/sign-up">
              <Button
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "2rem",
                  gap: "1rem",
                  padding: "1rem",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "200px",
                  margin: "auto 10px",
                }}
              >
                Sign Up For Free!
              </Button>
            </Link>
            {/* EXISTING USER */}
            <Link to="/login">
              <Button
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "2rem",
                  gap: "1rem",
                  padding: "1rem",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "150px",
                  margin: "auto 10px",
                }}
              >
                Sign IN
              </Button>
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <img
            src={landingImage}
            alt="landing-image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Hero;
