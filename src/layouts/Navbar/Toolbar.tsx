import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Link, Typography } from "@mui/material";
import LogoComponent from "../../components/shared/LogoComponent";
import SearchComponent from "../../components/shared/SearchComponent";
import { useAuth } from "../../hooks/AuthenticationProvider";
import { useNavigation } from "../../hooks/NavigationProvider";
import { StyledToolbarContainer } from "../../styles/tool-bar";

export default function Toolbar() {
  const { navItems } = useNavigation();
  const { user, logout } = useAuth();
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
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        justifyContent="flex-end"
        minWidth={220}
      >
        <ShoppingCartIcon sx={{ cursor: "pointer" }} />
        {!user ? (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href={"/login"}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              href={"/sign-up"}
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              onClick={logout}
            >
              Log Out
            </Button>
          </Box>
        )}
      </Box>
    </StyledToolbarContainer>
  );
}
