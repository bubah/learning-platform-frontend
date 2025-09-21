import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Dialog,
  Divider,
  Drawer,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigation } from "../../../hooks/NavigationProvider";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const { navItems } = useNavigation();
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          <List>
            <ListItem onClick={handleClose}>Login</ListItem>
            <ListItem onClick={handleClose}>Sign Up</ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
