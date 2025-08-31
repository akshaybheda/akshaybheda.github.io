import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import {
  GitHub,
  LightModeOutlined,
  LinkedIn,
  Phone,
} from "@mui/icons-material";
const pages = ["Home", "Timeline", "Projects", "Tech Stack", "Open Source", "Resume"];
import Resume from "../../assets/resume.pdf";
import Menu from "@mui/material/Menu";
import React from "react";
import { SiteIcon } from "../../assets/FavIcon";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const toggleDarkMode = () => {
    if (mode == "light") setMode("dark");
    else if (mode == "dark") setMode("light");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            display: "flex",
            ml: 0,
            mr: 0,
          }}
        >
          <SiteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#/"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Akshay Bheda
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
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    const slug = page.replace(/\s+/g, "-").toLowerCase();
                    if (page === "Resume") {
                      window.open(Resume, "_blank"); // Open resume in new tab
                    } else if (page === "Projects") {
                      window.location.hash = "#/project"; // Use hash-based navigation
                    } else if (page === "Open Source") {
                      window.location.hash = "#/opensource"; // Use hash-based navigation
                    } else {
                      if (window.location.hash !== "#/") {
                        // Store target section in sessionStorage
                        sessionStorage.setItem("scrollTo", slug);
                        window.location.hash = "#/"; // Redirect to homepage
                      } else {
                        const el = document.getElementById(slug);
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                  sx={{
                    my: 0,
                    display: "block",
                    color: mode == "light" ? "black" : "white",
                    p: 1,
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page}
                  </Typography>
                </Button>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "start" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  const slug = page.replace(/\s+/g, "-").toLowerCase();
                  if (page === "Resume") {
                    window.open(Resume, "_blank"); // Open resume in new tab
                  } else if (page === "Projects") {
                    window.location.hash = "#/project"; // Use hash-based navigation
                  } else if (page === "Open Source") {
                    window.location.hash = "#/opensource"; // Use hash-based navigation
                  } else {
                    if (window.location.hash !== "#/") {
                      // Store target section in sessionStorage
                      sessionStorage.setItem("scrollTo", slug);
                      window.location.hash = "#/"; // Redirect to homepage
                    } else {
                      const el = document.getElementById(slug);
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: { justifyContent: "end" },
            }}
          >
            <IconButton component="a" href="tel:+1-980-358-0053" aria-label="call">
              <Phone />
            </IconButton>
            <IconButton component="a" href="https://www.linkedin.com/in/akshaybheda/" aria-label="linkedin">
              <LinkedIn />
            </IconButton>
            <IconButton component="a" href="https://github.com/akshaybheda" aria-label="github">
              <GitHub />
            </IconButton>
            <IconButton onClick={toggleDarkMode}>
              {mode == "light" ? <DarkModeIcon /> : <LightModeOutlined />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
