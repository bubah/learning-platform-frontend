import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import StarIcon from "@mui/icons-material/Star";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#0B3D2E",
        color: "#fff",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        {/* 🔹 First Row: Logo and Title */}
        <Box display="flex" alignItems="center" gap={1} mb={4}>
          <NightsStayIcon
            sx={{
              color: "#C0C0C0", // bright silver
              fontSize: 28,
            }}
          />

          <Typography variant="h6" fontWeight="bold">
            Wisdom Beyond Walls
          </Typography>
          <StarIcon
            sx={{
              color: "#FFD700", // bright gold
              fontSize: 8,
            }}
          />
        </Box>

        {/* 🔹 Second Row: Columns */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          gap={4}
        >
          {/* Column 1 */}
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Learning & Courses
            </Typography>
            <MuiLink href="#" underline="hover" color="inherit" display="block">
              Explore Courses
            </MuiLink>
            <MuiLink href="#" underline="hover" color="inherit" display="block">
              Meet the Scholars
            </MuiLink>
          </Box>

          {/* Column 2 */}
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Community & FAQs
            </Typography>
            <MuiLink href="#" underline="hover" color="inherit" display="block">
              Join Discussions
            </MuiLink>
            <MuiLink href="#" underline="hover" color="inherit" display="block">
              Frequently Asked Questions
            </MuiLink>
          </Box>

          {/* Column 3 */}
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Support & Contact
            </Typography>
            <MuiLink href="#" underline="hover" color="inherit" display="block">
              Get in Touch
            </MuiLink>
            <MuiLink href="#" underline="hover" color="inherit" display="block">
              Privacy Policy
            </MuiLink>
          </Box>
        </Box>

        {/* 🔹 Bottom Row */}
        <Box
          mt={4}
          pt={2}
          borderTop="1px solid #fff4"
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">Terms and Policy</Typography>
          <Typography variant="body2" color="#fff">
            © 2025 Wisdom Beyond Walls. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
