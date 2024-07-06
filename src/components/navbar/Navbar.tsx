import * as React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { AppName } from "../../App";
import { AuthContext } from "../../contexts/authContext";

const pages: string[][] = [
  // ["Home", "/"],
  // ["About", "/about"],
];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const {
    authenticated,
    setLoginFormOpen,
    setRegisterFormOpen,
    authUser,
    handleLogout,
  } = React.useContext(AuthContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="relative" sx={{ borderRadius: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "primary.contrastText",
              textDecoration: "none",
            }}
          >
            {AppName}
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
              {pages.map((page) => (
                <MenuItem
                  key={page[0]}
                  onClick={() => {
                    navigate(page[1]);
                  }}
                >
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {AppName}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", maxWidth: "1000px" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={() => {
                  navigate(page[1]);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          {authenticated || authUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User options">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, display: "flex", gap: "12px" }}
                >
                  <Typography fontSize={18} color="primary.contrastText">
                    {authUser?.username}
                  </Typography>
                  <Avatar
                    alt={authUser?.username}
                    src="/static/images/avatar/2.jpg" // implementar avatar
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
                {/* <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem> */}
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button
                sx={{
                  mr: 2,
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                }}
                variant="contained"
                onClick={() => {
                  setRegisterFormOpen(true);
                }}
              >
                Register
              </Button>
              <Button
                sx={{
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                }}
                variant="contained"
                onClick={() => {
                  setLoginFormOpen(true);
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
