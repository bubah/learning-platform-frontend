import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, Drawer, List, ListItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthenticationProvider";
import { useNavigation } from "../../../hooks/NavigationProvider";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const { navItems } = useNavigation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    handleClose();
    logout();
  };

  const onLogin = () => {
    handleClose();
    navigate("/login");
  };

  const onSignUp = () => {
    handleClose();
    navigate("/sign-up");
  };

  return (
    <>
      <Box
        component="button"
        onClick={() => handleClick()}
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </Box>
      <Drawer
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#F5F5F5", // Or any color you want
            },
          },
        }}
      >
        <Box width={250} role="presentation" onClick={handleClose}>
          <List>
            {navItems.map((item: any) => (
              <ListItem
                key={item}
                onClick={handleClose}
                component="a"
                href="/"
                sx={{
                  cursor: "pointer",
                  textTransform: "capitalize",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {item}
              </ListItem>
            ))}
          </List>
          <Divider />

          {user ? (
            <List>
              <ListItem onClick={onLogout}>Log Out</ListItem>
            </List>
          ) : (
            <List>
              <ListItem onClick={onLogin}>Login</ListItem>
              <ListItem onClick={onSignUp}>Sign Up</ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}
