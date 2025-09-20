import { styled, Typography } from "@mui/material";
import BurgerMenu from "../components/shared/Menu/BurgerMenu";
import SearchComponent from "../components/shared/SearchComponent";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { StyledToolbarContainer } from "../styles/tool-bar";

const MobileToolbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <StyledToolbarContainer isMobile={true}>
      <BurgerMenu />
      <Typography>Wisdom Beyond Walls</Typography>
      {!searchOpen && <SearchIcon onClick={handleClick} />}
      {searchOpen && <SearchComponent />}
      {searchOpen && <CloseIcon onClick={handleClick} />}
    </StyledToolbarContainer>
  );
};

export default MobileToolbar;
