import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { LightModeOutlined } from "@mui/icons-material";
const pages = ["Home", "Projects", "Contact Me"];

function Navbar() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const toggleDarkMode = () => {
    if (mode == "light") setMode("dark");
    else if (mode == "dark") setMode("light");
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false} >
        <Toolbar
          disableGutters
          sx={{justifyContent: "space-between", display: "flex", ml: 0, mr: 0}}
        >
          <AdbIcon sx={{ display: { md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 1,
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Akshay Bheda
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {}}
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
