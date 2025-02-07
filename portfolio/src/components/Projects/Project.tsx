import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { ProjectsData } from "./data/ProjectsData";
import ProjectCard from "./ProjectCard";
export default function Project() {
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
