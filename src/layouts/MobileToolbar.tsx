import { styled, Typography } from "@mui/material";
import BurgerMenu from "../components/shared/Menu/BurgerMenu";
import SearchComponent from "../components/shared/SearchComponent";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const StyledToolbarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between  ",
  alignItems: "center",
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[4],
  width: "100%",
  gap: theme.spacing(2), // Add this line for spacing between children
}));

const MobileToolbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <StyledToolbarContainer>
      <BurgerMenu />
      <Typography>Wisdom Beyond Walls</Typography>
      {!searchOpen && <SearchIcon onClick={handleClick} />}
      {searchOpen && <SearchComponent />}
      {searchOpen && <CloseIcon onClick={handleClick} />}
    </StyledToolbarContainer>
  );
};

export default MobileToolbar;
