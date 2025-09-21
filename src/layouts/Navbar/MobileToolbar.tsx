import { styled, Typography } from "@mui/material";
import BurgerMenu from "../../components/shared/Menu/BurgerMenu";
import SearchComponent from "../../components/shared/SearchComponent";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { StyledToolbarContainer } from "../../styles/tool-bar";
import LogoComponent from "../../components/shared/LogoComponent";

const MobileToolbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <StyledToolbarContainer isMobile={true} searchOpen={searchOpen}>
      {!searchOpen && <BurgerMenu />}
      {!searchOpen && <LogoComponent />}
      {!searchOpen && <SearchIcon onClick={handleClick} />}
      {searchOpen && <SearchComponent />}
      {searchOpen && <CloseIcon onClick={handleClick} />}
    </StyledToolbarContainer>
  );
};

export default MobileToolbar;
