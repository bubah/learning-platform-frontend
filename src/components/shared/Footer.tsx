import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  styled,
} from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import StarIcon from "@mui/icons-material/Star";
import LogoComponent from "./LogoComponent";

const StyledFooter = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.info.main,
  color: "#fff",
  padding: theme.spacing(2),
  paddingBottom: "16px",
  marginTop: "auto",
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Box maxWidth="xl">
        {/* 🔹 First Row: Logo and Title */}
        <Box display="flex" alignItems="center" gap={1} mb={4}>
          <LogoComponent />
        </Box>

        {/* 🔹 Second Row: Columns */}
        <Box
          display="flex"
          // flexDirection={{ xs: "column", sm: "row" }}
          // justifyContent="space-between"
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
      </Box>
    </StyledFooter>
  );
};

export default Footer;
