import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownCircleTwoToneIcon from "@mui/icons-material/ArrowDropDownCircleTwoTone";
import { Box } from "@mui/material";

export default function DropDownMenu({
  onChange,
  items,
  selected,
}: {
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  items: string[];
  selected?: number;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (newValue: number | null) => {
    setAnchorEl(null);
    console.log("new value", newValue);
    if (!newValue && newValue != 0) return;
    onChange({} as any, newValue);
  };

  return (
    <Box padding={2}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: 0 }}
      >
        <ArrowDropDownCircleTwoToneIcon fontSize="large" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {/* <MenuItem onClick={() => handleClose(0)}>Profile</MenuItem>
        <MenuItem onClick={() => handleClose(1)}>My account</MenuItem>
        <MenuItem onClick={() => handleClose(2)}>Logout</MenuItem> */}
        {items.map((item: string, index: number) => (
          <MenuItem
            key={index}
            onClick={() => handleClose(index)}
            selected={index === selected}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
