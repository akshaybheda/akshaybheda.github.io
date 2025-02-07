/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import { ProjectInfo } from "./types/ProjectInfo";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function ProjectCard(props: ProjectInfo) {
  const {
    Title,
    Description,
    AdditionalText1,
    AdditionalText2,
    AdditionalText3,
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={2} maxWidth={"lg"} margin={2}>
      <Grid size={12}>
        <Card>
          <CardHeader title={Title} />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {Description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {AdditionalText1 && <Typography sx={{ marginBottom: 2 }}>{AdditionalText1}</Typography>}
              {AdditionalText2 && <Typography sx={{ marginBottom: 2 }}>{AdditionalText2}</Typography>}
              {AdditionalText3 && <Typography sx={{ marginBottom: 2 }}>{AdditionalText3}</Typography>}
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}
