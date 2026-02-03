import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { Typography, Tabs, Tab, Container } from "@mui/material";
import DataObjectIcon from "@mui/icons-material/DataObject";
import KeyIcon from "@mui/icons-material/Key";
import CompareIcon from "@mui/icons-material/Compare";
import JsonFormatter from "./JsonFormatter";
import JwtViewer from "./JwtViewer";
import TextComparer from "./TextComparer";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`devtools-tabpanel-${index}`}
            aria-labelledby={`devtools-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `devtools-tab-${index}`,
        "aria-controls": `devtools-tabpanel-${index}`,
    };
}

export default function DevTools() {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box
            id="DevTools"
            sx={{
                minHeight: "93vh",
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                paddingTop: "calc(1rem + 64px)",
                paddingLeft: { xs: 1, md: 2 },
                paddingRight: { xs: 1, md: 2 },
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                >
                    Developer Tools
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 3 }}
                >
                    Handy utilities I use daily - now hosted right here. No data leaves
                    your browser.
                </Typography>

                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="developer tools tabs"
                        centered
                        variant="fullWidth"
                    >
                        <Tab
                            icon={<DataObjectIcon />}
                            iconPosition="start"
                            label="JSON Formatter"
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={<KeyIcon />}
                            iconPosition="start"
                            label="JWT Decoder"
                            {...a11yProps(1)}
                        />
                        <Tab
                            icon={<CompareIcon />}
                            iconPosition="start"
                            label="Text Comparer"
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <JsonFormatter />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <JwtViewer />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <TextComparer />
                </TabPanel>
            </Container>
        </Box>
    );
}

