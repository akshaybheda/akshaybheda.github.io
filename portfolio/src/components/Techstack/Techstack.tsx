import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { TechIconsSource } from "./data/TechIconsSource";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
export default function Techstack() {
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
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        gutterBottom
        align="center"
        marginTop={4}
      >
        Tools I utilize consist of, but are not restricted to
      </Typography>
      <Grid
        container
        maxWidth="lg"
        alignItems="center"
        spacing={{ xs: 1, md: 2 }}
        marginTop={3}
      >
        {TechIconsSource.map((item) => (
          <Grid size={3} key={item.Title}>
            <Card
              sx={{
                boxShadow: 0,
                backgroundImage: "none",
              }}
            >
              <CardMedia
                component="img"
                image={item.Image}
                alt={item.Title}
                loading="lazy"
                sx={{ height: 80, objectFit: "contain" }}
              />
              <CardContent
                sx={{ textAlign: "center", padding: { xs: 0, md: "2rem" } }}
              >
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {item.Title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
