import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { ProjectsData } from "./data/ProjectsData";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";
import { Paper, Typography } from "@mui/material";
export default function Project() {
  //TODO: work on the page management
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const theme = useTheme();
  return (
    <Box
      id="Home"
      sx={{
        minHeight: "93vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h5" align="center"  gutterBottom>
        Curious about a day in my life?
      </Typography>
      <Paper elevation={3} sx={{ margin: "16px" }}>
        <Typography margin={2} variant="body1" align="justify">
          As a senior developer in a team of six, I take on broader
          responsibilities across multiple web applications—around six in total.
          While I primarily focus on two, I also contribute to key features
          across the rest when needed. Additionally, I oversee security for
          these applications, ensuring compliance by monitoring and addressing
          vulnerabilities from Mend/WhiteSource scans and ZAP active/passive
          scans, proactively applying fixes to maintain system integrity.
        </Typography>
      </Paper>
      <Typography variant="h5" align="center" gutterBottom>
        Solo Quests begin right down here!
      </Typography>
      {ProjectsData.map((project, index) => (
        <ProjectCard
          key={index}
          Title={project.Title}
          Description={project.Description}
          AdditionalText1={project.AdditionalText1}
          AdditionalText2={project.AdditionalText2}
          AdditionalText3={project.AdditionalText3}
        />
      ))}
    </Box>
  );
}
