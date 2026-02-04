import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import {
    Typography,
    TextField,
    Button,
    Paper,
    IconButton,
    Tooltip,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ClearIcon from "@mui/icons-material/Clear";

export default function UrlEncoderDecoder() {
    const theme = useTheme();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);

    const handleProcess = () => {
        try {
            if (mode === "encode") {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (error) {
            // Handle malformed URI sequences
            setOutput("Error: Invalid URL encoding");
        }
    };

    const handleSwap = () => {
        setInput(output);
        setOutput(input);
    };

    const handleCopy = async () => {
        if (output) {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
    };

    const handleModeChange = (
        _event: React.MouseEvent<HTMLElement>,
        newMode: "encode" | "decode" | null
    ) => {
        if (newMode !== null) {
            setMode(newMode);
            // Clear output when mode changes
            setOutput("");
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" gutterBottom fontWeight="bold">
                URL Encoder / Decoder
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Encode or decode URL components. Perfect for query parameters, path
                segments, or any URL-unsafe characters.
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={handleModeChange}
                    aria-label="encoding mode"
                    size="small"
                >
                    <ToggleButton value="encode" aria-label="encode">
                        Encode
                    </ToggleButton>
                    <ToggleButton value="decode" aria-label="decode">
                        Decode
                    </ToggleButton>
                </ToggleButtonGroup>

                <Button
                    variant="contained"
                    onClick={handleProcess}
                    disabled={!input.trim()}
                >
                    {mode === "encode" ? "Encode" : "Decode"}
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<SwapHorizIcon />}
                    onClick={handleSwap}
                    disabled={!input && !output}
                >
                    Swap
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ClearIcon />}
                    onClick={handleClear}
                    disabled={!input && !output}
                >
                    Clear
                </Button>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                            minHeight: "40px",
                        }}
                    >
                        <Typography variant="subtitle2">Input</Typography>
                    </Box>
                    <TextField
                        multiline
                        fullWidth
                        minRows={12}
                        maxRows={20}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            mode === "encode"
                                ? "https://example.com/search?q=hello world&lang=en"
                                : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den"
                        }
                        sx={{
                            "& .MuiInputBase-root": {
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                            minHeight: "40px",
                        }}
                    >
                        <Typography variant="subtitle2">Output</Typography>
                        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={handleCopy}
                                    disabled={!output}
                                    color={copied ? "success" : "default"}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                    <TextField
                        multiline
                        fullWidth
                        minRows={12}
                        maxRows={20}
                        value={output}
                        InputProps={{ readOnly: true }}
                        placeholder={
                            mode === "encode"
                                ? "Encoded URL will appear here"
                                : "Decoded URL will appear here"
                        }
                        sx={{
                            "& .MuiInputBase-root": {
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                                bgcolor: theme.palette.action.hover,
                            },
                        }}
                    />
                </Box>
            </Box>
        </Paper>
    );
}
