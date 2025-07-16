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
  Autocomplete,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthenticationProvider";
import StarIcon from "@mui/icons-material/Star";
import NightsStayIcon from "@mui/icons-material/NightsStay";

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
        backgroundColor: "#0B3D2E", // deep green
        color: "#FFD700", // gold text
        boxShadow: "0px 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NightsStayIcon
            sx={{
              color: "#C0C0C0", // bright silver
              fontSize: 28,
            }}
          />
          <StarIcon
            sx={{
              color: "#FFD700", // bright gold
              fontSize: 8,
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
              flexGrow: 1.5,
              minWidth: "350px",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
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
                backgroundColor: "#D4AF37",
                transition: "width 0.3s ease",
              },

              "&:hover": {
                color: "#D4AF37", // rich gold hover
                "&::after": {
                  backgroundColor: "#D4AF37", // gold underline
                },
              },

              "&:hover::after": {
                width: "82%", // 🔥 underline slides across
              },
            }}
          >
            WISDOM BEYOND WALLS
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
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#fff",
                      "&:hover": {
                        color: "#D4AF37",
                      },
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

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
            WBW
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              mx: 2,
            }}
          >
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Autocomplete
                id="free-solo-2-demo"
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  minWidth: "400px",
                }}
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    fullWidth
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
          </Box>

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
                color: "#fff",
                display: "block",
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 0,
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                transition: "color 0.3s ease",
                fontSize: "20px",
                whiteSpace: "nowrap",

                // underline bar (hidden by default)
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: 0,
                  height: "2px",
                  left: 0,
                  bottom: 0,
                  backgroundColor: "#D4AF37",
                  transition: "width 0.3s ease",
                },

                "&:hover": {
                  color: "#D4AF37", // rich gold hover
                  "&::after": {
                    backgroundColor: "#D4AF37", // gold underline
                  },
                },

                "&:hover::after": {
                  width: "100%", // 🔥 the bar slides across the full button
                },
              }}
            >
              {page}
            </Button>
          ))}

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              minWidth: "200px",
            }}
          >
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
                    <MenuItem
                      key={setting.name}
                      onClick={handleCloseUserMenu}
                      sx={{
                        backgroundColor: "#fff",
                        "&:hover": {
                          backgroundColor: "#D4AF37",
                        },
                      }}
                    >
                      <Typography
                        onClick={setting.action}
                        sx={{
                          textAlign: "center",
                          color: "#0B3D2E",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                      >
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>

                <Button
                  onClick={logout}
                  sx={{
                    height: "40px",
                    whiteSpace: "nowrap", // ✅ Prevents text from wrapping
                    minWidth: "100px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "#0B3D2E",
                    fontWeight: 700, // 🔥 upgraded from 500 to 700
                    fontSize: "1rem", // 🔥 slight bump from default (~0.875rem)
                    letterSpacing: "0.5px", // 🔥 subtle premium feel
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    mx: 3,
                    "&:hover": {
                      border: "3px solid #D4AF37",
                      backgroundColor: "rgba(34, 139, 34, 0.1)",
                      color: "#fff",
                      fontWeight: 800, // 🔥 heavier bold on hover
                    },
                  }}
                >
                  {user ? "LOGOUT" : ""}
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/sign-up"
                  sx={{
                    height: "40px",
                    whiteSpace: "nowrap", // ✅ Prevents text from wrapping
                    minWidth: "100px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "#0B3D2E",
                    fontWeight: 700, // 🔥 upgraded from 500 to 700
                    fontSize: "1rem", // 🔥 slight bump from default (~0.875rem)
                    letterSpacing: "0.5px", // 🔥 subtle premium feel
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    mx: 3,
                    "&:hover": {
                      border: "3px solid #D4AF37",
                      backgroundColor: "rgba(34, 139, 34, 0.1)",
                      color: "#fff",
                      fontWeight: 800, // 🔥 heavier bold on hover
                    },
                  }}
                >
                  {user ? "" : "SIGN UP"}
                </Button>

                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    height: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "#0B3D2E",
                    fontWeight: 700, // 🔥 upgraded from 500 to 700
                    fontSize: "1rem", // 🔥 slight bump from default (~0.875rem)
                    letterSpacing: "0.5px", // 🔥 subtle premium feel
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "3px solid #D4AF37",
                      backgroundColor: "rgba(34, 139, 34, 0.1)",
                      color: "#fff",
                      fontWeight: 800, // 🔥 heavier bold on hover
                    },
                  }}
                >
                  {user ? "" : "LOGIN"}
                </Button>
              </>
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
