import { Box, Button, styled, Typography } from "@mui/material";
import SearchComponent from "../components/shared/SearchComponent";
import { StyledToolbarContainer } from "../styles/tool-bar";
import { useNavigation } from "../hooks/NavigationProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SynagogueIcon from "@mui/icons-material/Synagogue";
import LogoComponent from "../components/shared/LogoComponent";

export default function Toolbar() {
  const { navItems } = useNavigation();
  return (
    <StyledToolbarContainer isMobile={false} searchOpen={false}>
      <LogoComponent />
      <Box display="flex" gap={3}>
        {navItems.map((item: any) => (
          <Typography key={item} sx={{ cursor: "pointer" }}>
            {item}
          </Typography>
        ))}
      </Box>
      <SearchComponent />
      <Box display="flex" gap={2} alignItems="center">
        <ShoppingCartIcon sx={{ cursor: "pointer" }} />
        <Box display="flex" gap={1}>
          <Button variant="contained" color="primary">
            Log In
          </Button>
          <Button variant="contained" color="secondary">
            Sign Up
          </Button>
        </Box>
      </Box>
    </StyledToolbarContainer>
  );
}
