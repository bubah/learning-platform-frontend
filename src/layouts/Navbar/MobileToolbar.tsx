import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import LogoComponent from "../../components/shared/LogoComponent";
import BurgerMenu from "../../components/shared/Menu/BurgerMenu";
import SearchComponent from "../../components/shared/SearchComponent";
import { StyledToolbarContainer } from "../../styles/tool-bar";

const MobileToolbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <StyledToolbarContainer isMobile={true} searchOpen={searchOpen}>
      {searchOpen ? (
        <>
          <SearchComponent />
          <CloseIcon onClick={handleClick} />
        </>
      ) : (
        <>
          <BurgerMenu />
          <LogoComponent />
          <SearchIcon onClick={handleClick} />
        </>
      )}
    </StyledToolbarContainer>
  );
};

export default MobileToolbar;
