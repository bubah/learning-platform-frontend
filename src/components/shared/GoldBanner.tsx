import { Box, Typography } from "@mui/material";

export const GoldBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        textAlign: "center",
        padding: "10px",
      }}
    >
      <Typography color="white">
        FLASH SALE | 50% OFF ANY 1 COURSE FOR FIRST TIME USERS
      </Typography>
    </Box>
  );
};
