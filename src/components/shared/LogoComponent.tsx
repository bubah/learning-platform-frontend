import { Box, Link, Typography } from "@mui/material";
import SynagogueIcon from "@mui/icons-material/Synagogue";

export default function LogoComponent() {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      component={Link}
      href="/"
      sx={{
        textDecoration: "none", // removes underline
        color: "inherit", // uses parent color, not link blue
        cursor: "default", // normal cursor
      }}
    >
      <SynagogueIcon fontSize="large" />
      <Typography textAlign={"center"}>WISDEOM BEYOND WALLS</Typography>
    </Box>
  );
}
