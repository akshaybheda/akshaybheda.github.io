import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import {
    Typography,
    TextField,
    Paper,
    Alert,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface DecodedJwt {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
}

function base64UrlDecode(str: string): string {
    // Replace URL-safe characters and add padding
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return decodeURIComponent(
        atob(padded)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
}

function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const isExpired = diff < 0;
    const formatted = date.toLocaleString();

    if (isExpired) {
        const expiredAgo = Math.abs(diff);
        const days = Math.floor(expiredAgo / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (expiredAgo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        return `${formatted} (Expired ${days > 0 ? `${days}d ` : ""}${hours}h ago)`;
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${formatted} (Expires in ${days > 0 ? `${days}d ` : ""}${hours}h)`;
    }
}

export default function JwtViewer() {
    const theme = useTheme();
    const [input, setInput] = useState("");
    const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    const decodeJwt = (token: string) => {
        if (!token.trim()) {
            setDecoded(null);
            setError(null);
            return;
        }

        try {
            const parts = token.trim().split(".");
            if (parts.length !== 3) {
                throw new Error("JWT must have 3 parts separated by dots");
            }

            const header = JSON.parse(base64UrlDecode(parts[0]));
            const payload = JSON.parse(base64UrlDecode(parts[1]));
            const signature = parts[2];

            setDecoded({ header, payload, signature });
            setError(null);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Invalid JWT format");
            setDecoded(null);
        }
    };

    const handleInputChange = (value: string) => {
        setInput(value);
        decodeJwt(value);
    };

    const handleCopy = async (content: string, section: string) => {
        await navigator.clipboard.writeText(content);
        setCopiedSection(section);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const isExpired = decoded?.payload?.exp
        ? (decoded.payload.exp as number) * 1000 < Date.now()
        : false;

    const renderValue = (key: string, value: unknown): React.ReactNode => {
        if (["exp", "iat", "nbf"].includes(key) && typeof value === "number") {
            return (
                <Box component="span">
                    <Box component="span" sx={{ color: theme.palette.info.main }}>
                        {value}
                    </Box>
                    <Typography
                        component="span"
                        variant="caption"
                        sx={{ ml: 1, color: theme.palette.text.secondary }}
                    >
                        ({formatTimestamp(value)})
                    </Typography>
                </Box>
            );
        }
        if (typeof value === "string") {
            return (
                <Box component="span" sx={{ color: theme.palette.success.main }}>
                    "{value}"
                </Box>
            );
        }
        if (typeof value === "number") {
            return (
                <Box component="span" sx={{ color: theme.palette.info.main }}>
                    {value}
                </Box>
            );
        }
        if (typeof value === "boolean") {
            return (
                <Box component="span" sx={{ color: theme.palette.warning.main }}>
                    {value.toString()}
                </Box>
            );
        }
        return JSON.stringify(value, null, 2);
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
                JWT Decoder & Viewer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Paste a JWT to decode its header and payload. Works offline - tokens
                are not sent anywhere.
            </Typography>

            <TextField
                fullWidth
                multiline
                minRows={3}
                maxRows={6}
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                error={!!error}
                sx={{
                    mb: 2,
                    "& .MuiInputBase-root": {
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                    },
                }}
            />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <strong>Invalid JWT:</strong> {error}
                </Alert>
            )}

            {decoded && (
                <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                    <Chip
                        label={`Algorithm: ${decoded.header.alg || "Unknown"}`}
                        color="primary"
                        size="small"
                    />
                    <Chip
                        label={`Type: ${decoded.header.typ || "Unknown"}`}
                        size="small"
                    />
                    {typeof decoded.payload.exp === "number" && (
                        <Chip
                            label={isExpired ? "EXPIRED" : "VALID"}
                            color={isExpired ? "error" : "success"}
                            size="small"
                        />
                    )}
                </Box>
            )}

            {decoded && (
                <Box>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography fontWeight="bold" color="error.main">
                                    HEADER
                                </Typography>
                                <Tooltip
                                    title={
                                        copiedSection === "header" ? "Copied!" : "Copy header JSON"
                                    }
                                >
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy(
                                                JSON.stringify(decoded.header, null, 2),
                                                "header"
                                            );
                                        }}
                                        color={copiedSection === "header" ? "success" : "default"}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper
                                variant="outlined"
                                sx={{ p: 2, fontFamily: "monospace", fontSize: "0.875rem" }}
                            >
                                {Object.entries(decoded.header).map(([key, value]) => (
                                    <Box key={key} sx={{ mb: 0.5 }}>
                                        <Box component="span" sx={{ color: theme.palette.primary.main }}>
                                            "{key}"
                                        </Box>
                                        : {renderValue(key, value)}
                                    </Box>
                                ))}
                            </Paper>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography fontWeight="bold" color="secondary.main">
                                    PAYLOAD
                                </Typography>
                                <Tooltip
                                    title={
                                        copiedSection === "payload"
                                            ? "Copied!"
                                            : "Copy payload JSON"
                                    }
                                >
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy(
                                                JSON.stringify(decoded.payload, null, 2),
                                                "payload"
                                            );
                                        }}
                                        color={copiedSection === "payload" ? "success" : "default"}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper
                                variant="outlined"
                                sx={{ p: 2, fontFamily: "monospace", fontSize: "0.875rem" }}
                            >
                                {Object.entries(decoded.payload).map(([key, value]) => (
                                    <Box key={key} sx={{ mb: 0.5 }}>
                                        <Box component="span" sx={{ color: theme.palette.primary.main }}>
                                            "{key}"
                                        </Box>
                                        : {renderValue(key, value)}
                                    </Box>
                                ))}
                            </Paper>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography fontWeight="bold" color="info.main">
                                    SIGNATURE
                                </Typography>
                                <Tooltip
                                    title={
                                        copiedSection === "signature"
                                            ? "Copied!"
                                            : "Copy signature"
                                    }
                                >
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy(decoded.signature, "signature");
                                        }}
                                        color={
                                            copiedSection === "signature" ? "success" : "default"
                                        }
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    fontFamily: "monospace",
                                    fontSize: "0.875rem",
                                    wordBreak: "break-all",
                                }}
                            >
                                {decoded.signature}
                            </Paper>
                            <Alert severity="info" sx={{ mt: 1 }}>
                                Note: Signature verification requires the secret key and is not
                                performed client-side.
                            </Alert>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )}
        </Paper>
    );
}
