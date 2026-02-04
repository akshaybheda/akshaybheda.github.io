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
          <Paper elevation={3} sx={{ margin: "16px", width: '100%' }}>
            <Typography margin={2} variant="body1" align="justify">
              Contributed a critical fix to the <a href="https://github.com/snowflakedb/snowflake-connector-net">Snowflake .NET Connector</a> regarding culture-invariant parsing.
              The issue was exceptionally subtle and hard to debug: in certain locales like Turkish, the character 'i' upper-cases to 'İ' (with a dot), which caused enum parsing for session properties to fail silently or throw cryptic errors depending on the system configuration.
              I identified the root cause in the non-culture-invariant use of <code>Enum.Parse</code> and proposed the fix to use <code>ignoreCase: true</code> with culture-invariant comparisons.
              This ensured the driver's reliability for users worldwide, regardless of their machine's regional settings.
              My contribution was acknowledged and integrated into the official repository via <a href="https://github.com/snowflakedb/snowflake-connector-net/pull/1296">PR #1296</a> (refining my initial <a href="https://github.com/snowflakedb/snowflake-connector-net/pull/1294">PR #1294</a>).
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', padding: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <a href="https://github.com/snowflakedb/snowflake-connector-net/pull/1296" target="_blank" rel="noreferrer">
                  <img src="https://img.shields.io/badge/PR-%231296-blue" alt="PR #1296" />
                </a>
                <a href="https://github.com/snowflakedb/snowflake-connector-net" target="_blank" rel="noreferrer">
                  <img src="https://img.shields.io/github/stars/snowflakedb/snowflake-connector-net.svg?style=social&label=Stars" alt="Snowflake stars" />
                </a>
              </Box>
            </Box>
          </Paper>
        </ListItem>
        <ListItem>
          <Paper elevation={3} sx={{ margin: "16px", width: '100%' }}>
            <Typography margin={2} variant="body1" align="justify">
              I started using <a href="https://github.com/DigDes/">SoapCore</a> in my application to enable SOAP services in .NET Core. During load testing, I encountered a severe performance bottleneck when the server received more than 500 requests per second.
              After investigation, I diagnosed the issue as an improper async/await implementation, which was blocking threads and causing thread starvation.
              To resolve this, I contributed a fix that optimized the asynchronous execution, preventing thread exhaustion and significantly improving performance under high loads.
              <a href="https://github.com/DigDes/SoapCore/issues/1026"> My fix </a> was merged into the library, benefiting all users running high-volume SOAP services.
              Beyond this, I also contributed improvements to exception handling and other stability enhancements to ensure better resilience in production environments.
            </Typography>
            <Typography margin={2} variant="body1" align="justify">
              I discovered that <strong>Cancellation tokens</strong> were not being respected by the SoapCore library. After investigating, I submitted a <a href="https://github.com/DigDes/SoapCore/pull/1137">fix</a> to resolve this.
              My investigation also led to the discovery of an underlying issue in the <strong>.NET Framework</strong> where <code>XDocument.LoadAsync</code> operates synchronously despite its name, a finding I documented in the <a href="https://github.com/dotnet/runtime/issues/114555">dotnet/runtime</a> repository.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', padding: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <a href="https://github.com/DigDes/SoapCore/pull/1137" target="_blank" rel="noreferrer">
                  <img src="https://img.shields.io/badge/PR-%231137-blue" alt="PR #1137" />
                </a>
                <a href="https://github.com/DigDes/SoapCore" target="_blank" rel="noreferrer">
                  <img src="https://img.shields.io/github/stars/DigDes/SoapCore.svg?style=social&label=Stars" alt="SoapCore stars" />
                </a>
              </Box>
              {/* code snippet removed as requested */}
            </Box>
          </Paper>
        </ListItem>
        <ListItem>
          <Paper elevation={3} sx={{ margin: "16px", width: '100%' }}>
            <Typography margin={2} variant="body1" align="justify">
              I created and maintain <a href="https://github.com/akshaybheda/vitest-azure-reporter">vitest-azure-reporter</a>,
              a Vitest reporter that integrates with Azure DevOps Test Plans to automatically publish test results.
              It extracts test case IDs from test names or Vitest annotations, creates and completes test runs,
              and supports flexible configuration for mapping test points and environments. The package is
              published as <a href="https://www.npmjs.com/package/@akshaybheda/vitest-azure-reporter">@akshaybheda/vitest-azure-reporter</a>
              and targets modern Node.js (ES module) environments.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', padding: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <a href="https://www.npmjs.com/package/@akshaybheda/vitest-azure-reporter" target="_blank" rel="noreferrer">
                  <img src="https://img.shields.io/npm/v/@akshaybheda/vitest-azure-reporter.svg" alt="npm version" />
                </a>
                <a href="https://github.com/akshaybheda/vitest-azure-reporter" target="_blank" rel="noreferrer">
                  <img src="https://img.shields.io/github/stars/akshaybheda/vitest-azure-reporter.svg?style=social&label=Stars" alt="Repo stars" />
                </a>
              </Box>
              {/* code snippet removed as requested */}
            </Box>
          </Paper>
        </ListItem>
        <ListItem>
          <Paper elevation={3} sx={{ margin: "16px", width: '100%' }}>
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
