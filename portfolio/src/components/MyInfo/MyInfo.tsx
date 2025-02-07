import Box from "@mui/material/Box";
import { Typography, Button, Paper, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import MyPic from "../../assets/image.jpg";
import Resume from "../../assets/resume.pdf";
import { useEffect } from "react";

export default function MainContent() {
  const theme = useTheme();

  useEffect(() => {
    const scrollTo = sessionStorage.getItem("scrollTo");
  
    if (scrollTo && window.location.hash === "#/") {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        sessionStorage.removeItem("scrollTo");
      }, 100);
    } else if (window.location.hash === "#/project") {
      // Force scroll to top when navigating to /project
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [window.location.hash]);
  
  return (
    <Box
      id="Home"
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid2 container spacing={4} maxWidth="lg" alignItems="center">
        <Grid2 size={6}>
          <Typography
            variant="h1"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Curious Developer
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Hey there! Call me Akshay. I enjoy creating kickass websites and
            performance backend systems, ones that suit your desires and needs
            using latest technologies and cleanest design patterns.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="outlined" color="primary">
              VIEW PROJECTS
            </Button>
            <Button variant="outlined" color="primary" onClick={() => window.open(Resume, "_blank")}>
              VIEW RESUME
            </Button>
          </Box>
        </Grid2>
        <Grid2 size={6}>
          <Paper
            variant="elevation"
            elevation={12}
            sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              component="img"
              src={MyPic}
              alt="Akshay Bheda"
              sx={{ width: "100%", height: "600px", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                p: 1.5,
                borderRadius: 1,
                boxShadow: 3,
              }}
            >
              "No One Ever Made A Difference By Being Like Everyone Else." –
              Hugh Jackman as P.T. Barnum
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
