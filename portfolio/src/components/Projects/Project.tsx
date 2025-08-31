import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { ProjectsData } from "./data/ProjectsData";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";
import { Paper, Typography, List, ListItem } from "@mui/material";
import { DayInMyLife } from "./data/DayInMyLife";
export default function Project() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const theme = useTheme();
  return (
    <Box
      id="Project"
      sx={{
        minHeight: "93vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        paddingTop: "calc(1rem + 64px)",
        paddingLeft: { xs: 1, md: 2 },
        paddingRight: { xs: 1, md: 2 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Curious about a day in my life?
      </Typography>
      <Paper elevation={3} sx={{ margin: "16px" }}>
        <Typography margin={2} variant="body1" align="justify">
          {DayInMyLife}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ margin: "16px" }}>
        <Typography margin={1} variant="body1" align="justify">
          Recent Achievements:
        </Typography>
        <List dense={true}>
          <ListItem>
            <Typography variant="body2" align="justify">
              Led migration of company reporting from on-prem Power BI Report
              Server to Power BI Service (cloud). Redesigned datasets to
              centralize metrics in Azure SQL, implemented incremental refresh
              and optimized DAX queries for large datasets, added row-level
              security for multi-tenant reports, and automated deployments
              using CI/CD pipelines. The migration improved report reliability
              and simplified operational management.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" align="justify">
              Migrated web application from Angular 1.8 to React 18 with a
              complete re-write
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" align="justify">
              Migrated old legacy applications to .Net 8.0. Improved the
              performance by 40% and security of the application.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" align="justify">
              Created some proof of concepts with micro-frontend and
              micro-services for upcoming web application. (See more below
              details below "Bentley Admin Portal")
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" align="justify">
              Assisting security team with security fixes detected by Static and
              Dynamics scans as well as creating threat models for the current
              applications.
            </Typography>
          </ListItem>
        </List>
      </Paper>
      <Typography variant="h5" align="center" gutterBottom>
        Solo Achievements begin right down here!
      </Typography>
      {ProjectsData.map((project) => (
        <ProjectCard
          key={project.Title}
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
