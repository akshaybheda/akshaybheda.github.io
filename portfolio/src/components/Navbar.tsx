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
import {
  GitHub,
  LightModeOutlined,
  LinkedIn,
  Phone,
} from "@mui/icons-material";
const pages = ["Home", "Timeline", "Projects", "Tech Stack", "Resume"];
import Resume from "../assets/resume.pdf";

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
    <AppBar position="fixed">
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
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "flex", justifyContent: "start" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  if (page === "Resume") {
                    window.open(Resume, "_blank");
                  } else {
                    document.getElementById(page)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
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
            <IconButton href="tel:+1-980-358-0053">
              <Phone />
            </IconButton>

            <IconButton href="https://www.linkedin.com/in/akshaybheda/">
              <LinkedIn />
            </IconButton>
            <IconButton href="https://github.com/akshaybheda">
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
