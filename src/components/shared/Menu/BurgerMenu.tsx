import MenuIcon from "@mui/icons-material/Menu";
import { Box, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigation } from "../../../hooks/NavigationProvider";

export default function BurgerMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { navItems } = useNavigation();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        component="button"
        onClick={handleClick}
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <MenuIcon />
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#F5F5F5", // Or any color you want
            },
          },
        }}
      >
        {navItems.map((item: any) => (
          <MenuItem key={item} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
