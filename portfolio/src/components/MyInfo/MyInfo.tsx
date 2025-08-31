import Box from "@mui/material/Box";
import { Typography, Button, Paper, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import MyPic from "../../assets/image.jpg";
import Resume from "../../assets/resume.pdf";
import { useEffect } from "react";
import { MyDetails } from "./data/intro";

export default function MainContent() {
  const theme = useTheme();

  useEffect(() => {
    const handleHashChange = () => {
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
    };

    // run on mount (in case user landed directly)
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <Box
      sx={{
        minHeight: { md: "80vh" },
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4rem",
        paddingLeft: { xs: 2, md: 3 },
        paddingRight: { xs: 2, md: 3 },
      }}
    >
      <Grid2 container spacing={4} maxWidth={{ md: "lg" }} alignItems="center">
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            fontWeight="bold"
            gutterBottom
            fontSize={{ xs: "h2.fontSize", md: "h1.fontSize" }}
          >
            Curious Developer
          </Typography>
          <Typography variant="body1" gutterBottom align="justify">
            {MyDetails}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => (window.location.hash = "#/project")}
            >
              VIEW PROJECTS
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.open(Resume, "_blank")}
            >
              VIEW RESUME
            </Button>
          </Box>
        </Grid2>
        <Grid2 display={{ xs: "none", md: "block" }} size={{ md: 6 }}>
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
