import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthenticationProvider";

const studentPages = ["My Courses", "Profile", "Settings"];
const instructorPages = ["Curriculum", "DashBoard", "Settings"];
const defaultPages = ["Popular Courses", "Pricing", "About Us", "Contact Us"];

const pagesMap = {
  learner: studentPages,
  instructor: instructorPages,
  default: defaultPages,
};

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const learningProgress = 50;

  const role = user?.role?.toLowerCase() as keyof typeof pagesMap;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    console.log(user);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      name: "Profile",
      action: () => {},
    },
    {
      name: "Account",
      action: () => {},
    },
    {
      name: "Dashboard",
      action: () => {},
    },
    {
      name: "Logout",
      action: logout,
    },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "black", // custom dark tone
        color: "limegreen", // custom light tone
        boxShadow: "0px 2px 4px rgba(0,0,0,0.3)", // subtle shadow
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "limegreen",
              border: "2px solid transparent",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              px: 2,
              py: 1,
              "&:hover": {
                border: "2px solid #228B22", // dark lime border
                backgroundColor: "rgba(34, 139, 34, 0.1)", // subtle solid background
                color: "#32CD32", // bright lime icon on hover
              },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "limegreen",
              textDecoration: "none",
              position: "relative",
              px: 2,
              py: 1,
              transition: "color 0.3s ease",

              // underline bar (hidden by default)
              "&::after": {
                content: '""',
                position: "absolute",
                width: 0,
                height: "2px",
                left: 0,
                bottom: 0,
                backgroundColor: "limegreen",
                transition: "width 0.3s ease",
              },

              "&:hover": {
                color: "#32CD32", // brighter lime on hover
              },

              "&:hover::after": {
                width: "100%", // 🔥 underline slides across
              },
            }}
          >
            LEARNING PLATFORM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pagesMap[role || "default"].map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center", color: "limegreen" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 0.5,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesMap[role || "default"].map((page) => (
              <Button
                to="/courses"
                component={Link}
                onClick={handleCloseNavMenu}
                sx={{
                  position: "relative",
                  my: 2,
                  px: 2,
                  py: 1,
                  color: "limegreen",
                  display: "block",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: 0,
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  transition: "color 0.3s ease",

                  // underline bar (hidden by default)
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: "2px",
                    left: 0,
                    bottom: 0,
                    backgroundColor: "limegreen",
                    transition: "width 0.3s ease",
                  },

                  "&:hover": {
                    color: "#32CD32", // optional brighter lime on hover
                    fontWeight: 600, // optional slightly bolder on hover
                  },

                  "&:hover::after": {
                    width: "100%", // 🔥 the bar slides across the full button
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              sx={{ backgroundColor: "white", borderRadius: 2 }}
              disableClearable
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                />
              )}
            />
          </Box>

          {user !== null && (
            <Box
              sx={{
                display: "flex",
                margin: 3,
                alignItems: "center",
                position: "relative",
              }}
            >
              <CircularProgress
                variant="determinate"
                color="inherit"
                value={learningProgress}
                sx={{ margin: 1 }}
              />

              <Box
                sx={{
                  top: 0,
                  left: 13,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "fit-content",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                >{`${Math.round(learningProgress)}%`}</Typography>
              </Box>
              <Typography>Your Progress</Typography>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {user !== null ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography
                        onClick={setting.action}
                        sx={{ textAlign: "center", color: "limegreen" }}
                      >
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/sign-up"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "0.5rem",
                  px: 3,
                  py: 1.5,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "2px solid transparent",
                  color: "limegreen",
                  fontWeight: 700, // 🔥 upgraded from 500 to 700
                  fontSize: "1rem", // 🔥 slight bump from default (~0.875rem)
                  letterSpacing: "0.5px", // 🔥 subtle premium feel
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: "2px solid #228B22",
                    backgroundColor: "rgba(34, 139, 34, 0.1)",
                    color: "#32CD32",
                    fontWeight: 800, // 🔥 heavier bold on hover
                  },
                }}
              >
                {user ? "" : "Sign up"}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
