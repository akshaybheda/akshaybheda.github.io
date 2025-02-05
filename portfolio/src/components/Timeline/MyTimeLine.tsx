import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function MyTimeLine() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10rem",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        gutterBottom
        align="center"
      >
        Milestones That Shaped My Journey
      </Typography>
      <Timeline position="alternate-reverse">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Jan 2023 - Current (Software Engineer II at Bentley Systems)
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Aug 2021 - Dec 2022 (Earned my Master's degree from UNC Charlotte)
            and Interned at <strong>ESRI</strong> from May 2022 - Aug 2022
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Aug 2020 - July 2021 (Software Engineer at Veritas Technologies)
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Oct 2019 - Aug 2020 (Software Engineer 1 at Bentley Systems)
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            June 2017 - Oct 2019 (Associate Software Engineer at Bentley
            Systems)
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            2013 - 2017 (Earned my Bachelor's from KIT's College of Engineering)
          </TimelineContent>
        </TimelineItem>
      </Timeline>{" "}
    </Box>
  );
}
