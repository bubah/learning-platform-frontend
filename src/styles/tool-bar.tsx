import { Box, styled } from "@mui/material";

interface StyledToolbarContainerProps {
  isMobile: boolean;
}

const StyledToolbarContainer = styled(Box)<StyledToolbarContainerProps>(
  ({ theme, isMobile }) => ({
    display: "flex",
    justifyContent: isMobile ? "space-between" : "flex-start",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[4],
    width: "100%",
    minHeight: "72px",
    gap: theme.spacing(5), // Add this line for spacing between children
  }),
) as unknown as typeof Box;

export { StyledToolbarContainer };
