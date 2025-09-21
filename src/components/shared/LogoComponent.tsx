import { Box, Typography } from "@mui/material";
import SynagogueIcon from "@mui/icons-material/Synagogue";

export default function LogoComponent() {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <SynagogueIcon fontSize="large" />
      <Typography>WISDEOM BEYOND WALLS</Typography>
    </Box>
  );
}
