import React, { Fragment, useContext, useEffect, useState } from "react";
import "./header.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../ColorModeContext";
import { MaterialUISwitch } from "../../Utils/Utils";

// const pages = ["Products", "Pricing", "Blog"];
const pages = [
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Blog",
    link: "viewPosts",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = ({ setToggleDark, toggleDark }) => {
  const theme = useTheme();
  console.log("theme", theme);

  const colorMode = useContext(ColorModeContext);
  console.log("colorMode", colorMode);

  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(
    sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleModeChange = () => {
    setToggleDark(!toggleDark);
  };

  useEffect(() => {
    console.log("headerrender");
    if (user) {
      const decodeToken = decode(sessionStorage.getItem("token"));
      console.log("decodeToken", decodeToken);
      console.log(
        "decodeToken.exp",
        decodeToken.exp * 1000,
        new Date().getTime()
      );
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        sessionStorage.clear();
        setUser(null);
        // navigate("/login");
        window.location.href = "/login";
      }
    }
  }, [location]);

  return (
    <Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              LOGO
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => {
                  return (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Link to={"/" + page.link} className="link-color-black">
                        <Typography textAlign="center">{page.name}</Typography>
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => {
                return (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link to={"/" + page.link} className="link-color">
                      {" "}
                      {page.name}
                    </Link>
                  </Button>
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 0 }} style={{ display: "contents" }}>
              <MaterialUISwitch onChange={colorMode.toggleColorMode} />
              {/* <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton> */}
              <Tooltip title="Open settings">
                {user ? (
                  <Fragment>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {/* <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    /> */}
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      >
                        {sessionStorage
                          .getItem("name")
                          .charAt(0)
                          .toLocaleUpperCase()}
                      </Avatar>
                      {/* <Typography variant="h6" noWrap color={"#fff"}>
                        {sessionStorage.getItem("name")}
                      </Typography> */}
                    </IconButton>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography variant="h6" noWrap color={"#fff"}>
                        Login / Signup
                      </Typography>
                    </Link>
                  </Fragment>
                )}
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        if (setting === "Logout") {
                          sessionStorage.clear();
                          // navigate("/login");
                          window.location.href = "/login";
                        }
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default Header;
