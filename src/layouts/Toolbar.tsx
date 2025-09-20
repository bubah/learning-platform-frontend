import { Box, styled, Typography } from "@mui/material";
import SearchComponent from "../components/shared/SearchComponent";
import { StyledToolbarContainer } from "../styles/tool-bar";
import { useNavigation } from "../hooks/NavigationProvider";

export default function Toolbar() {
  const { navItems } = useNavigation();
  return (
    <StyledToolbarContainer isMobile={false}>
      <Typography>Wisdom Beyond Walls</Typography>
      <Box display="flex" gap={3}>
        {navItems.map((item: any) => (
          <Typography key={item} sx={{ cursor: "pointer" }}>
            {item}
          </Typography>
        ))}
      </Box>
      <SearchComponent />
    </StyledToolbarContainer>
  );
}
