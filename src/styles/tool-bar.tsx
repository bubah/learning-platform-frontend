import { Box, styled } from "@mui/material";

interface StyledToolbarContainerProps {
  isMobile: boolean;
  searchOpen?: boolean;
  theme?: any;
}

const StyledToolbarContainer = styled(Box)<StyledToolbarContainerProps>(
  ({ theme, isMobile, searchOpen }) => ({
    display: "flex",
    color: theme.palette.common.white,
    justifyContent: isMobile
      ? searchOpen
        ? "space-between"
        : "space-between"
      : "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
    boxShadow: theme.shadows[4],
    width: "100%",
    minHeight: "72px",
    gap: theme.spacing(5), // Add this line for spacing between children
  }),
) as any;

export { StyledToolbarContainer };
