import { Box, useMediaQuery } from "@mui/material";
import MobileToolbar from "./MobileToolbar";
import Toolbar from "./Toolbar";

export const NavBar = () => {
  const isMobileView = useMediaQuery("(max-width:900px)");
  return <Box>{isMobileView ? <MobileToolbar /> : <Toolbar />}</Box>;
};
