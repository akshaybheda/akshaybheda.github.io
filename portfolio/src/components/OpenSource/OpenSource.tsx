import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { Paper, Typography, List, ListItem } from "@mui/material";
export default function Opensource() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const theme = useTheme();
  return (
    <Box
      id="Opensource"
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
        Open Source Contributions
      </Typography>
      <List dense={true}>
        <ListItem>
          <Paper elevation={3} sx={{ margin: "16px" }}>
            <Typography margin={2} variant="body1" align="justify">
              I started using <a href="https://github.com/DigDes/">SoapCore</a> in my application to enable SOAP services in .NET Core. During load testing, I encountered a severe performance bottleneck when the server received more than 500 requests per second.
              After investigation, I diagnosed the issue as an improper async/await implementation, which was blocking threads and causing thread starvation.
              To resolve this, I contributed a fix that optimized the asynchronous execution, preventing thread exhaustion and significantly improving performance under high loads.
              <a href="https://github.com/DigDes/SoapCore/issues/1026"> My fix </a> was merged into the library, benefiting all users running high-volume SOAP services.
              Beyond this, I also contributed improvements to exception handling and other stability enhancements to ensure better resilience in production environments.
            </Typography>
            <Typography margin={2} variant="body1" align="justify">
              Discovered that Cancellation token's are not respected by SoapCore library, Investigated it and suggested fix <a href="https://github.com/DigDes/SoapCore/pull/1137">More info in Pr!</a>, that also led to discovery that there's an issue with .Net Framework XDocument.LoadAsync method, even though it's marked async
              Internally it's still a sync method.<a href="https://github.com/dotnet/runtime/issues/114555">More info here!</a>
            </Typography>
          </Paper>
        </ListItem>
        <ListItem>
          <Paper elevation={3} sx={{ margin: "16px" }}>
            <Typography margin={2} variant="body1" align="justify">
              I developed an Azure DevOps extension, <a href="https://marketplace.visualstudio.com/items?itemName=akshay-bheda.list-followed-wikis">List Followed Wikis</a>, to address the lack of a built-in way to view followed wiki pages.
              In Azure DevOps, users have to manually bookmark and search for their followed pages, which is inefficient.
              This extension integrates directly into the Boards section, providing an easy way to access followed wiki pages without additional navigation.
              It is actively used in my company, improving productivity and workflow efficiency.
              The source code is available on <a href="https://github.com/akshaybheda/azure-devops-wiki-extension">GitHub</a>.
            </Typography>
          </Paper>
        </ListItem>
      </List>
    </Box>
  );
}
