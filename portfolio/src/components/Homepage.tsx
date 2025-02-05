import Box from "@mui/material/Box";
import "./Homepage.css";
import { Grid, Typography, Button, Paper } from "@mui/material";
function Homepage() {
  return(
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.900', color: 'white', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={4} maxWidth="lg" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Curious Developer
          </Typography>
          <Typography variant="body1" color="grey.400" gutterBottom>
            Hey there! Call me Akshay. I enjoy creating kickass websites and performance backend systems,
            ones that suit your desires and needs using latest technologies and cleanest design patterns.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="outlined" color="primary">
              VIEW PROJECTS
            </Button>
            <Button variant="text" color="primary">
              VIEW RESUME
            </Button>
          </Box>
        </Grid>

        <Grid item md={6}>
          <Paper elevation={6} sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
            <Box
              component="img"
              src="src/assets/image.jpg"
              alt="Akshay Bheda"
              sx={{ width: '100%', height: 600, objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                bgcolor: 'primary.main',
                color: 'black',
                p: 2,
                borderRadius: 1,
                boxShadow: 3
              }}
            >
              "No One Ever Made A Difference By Being Like Everyone Else." 
              – Hugh Jackman as P.T. Barnum
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Homepage;
