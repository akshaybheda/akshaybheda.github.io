import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import {
    Typography,
    TextField,
    Button,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ClearIcon from "@mui/icons-material/Clear";

interface DiffLine {
    type: "added" | "removed" | "unchanged";
    content: string;
    lineNumber: { left?: number; right?: number };
}

function computeDiff(text1: string, text2: string): DiffLine[] {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: DiffLine[] = [];

    // Simple LCS-based diff algorithm
    const m = lines1.length;
    const n = lines2.length;

    // Build LCS table
    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (lines1[i - 1] === lines2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack to find diff
    let i = m,
        j = n;
    const tempResult: DiffLine[] = [];

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
            tempResult.unshift({
                type: "unchanged",
                content: lines1[i - 1],
                lineNumber: { left: i, right: j },
            });
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            tempResult.unshift({
                type: "added",
                content: lines2[j - 1],
                lineNumber: { right: j },
            });
            j--;
        } else {
            tempResult.unshift({
                type: "removed",
                content: lines1[i - 1],
                lineNumber: { left: i },
            });
            i--;
        }
    }

    return tempResult.length > 0 ? tempResult : result;
}

export default function TextComparer() {
    const theme = useTheme();
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [showDiff, setShowDiff] = useState(false);
    const [viewMode, setViewMode] = useState<"unified" | "split">("unified");

    const diffResult = useMemo(() => {
        if (!showDiff || (!text1 && !text2)) return [];
        return computeDiff(text1, text2);
    }, [text1, text2, showDiff]);

    const stats = useMemo(() => {
        const added = diffResult.filter((d) => d.type === "added").length;
        const removed = diffResult.filter((d) => d.type === "removed").length;
        const unchanged = diffResult.filter((d) => d.type === "unchanged").length;
        return { added, removed, unchanged };
    }, [diffResult]);

    const handleCompare = () => {
        setShowDiff(true);
    };

    const handleClear = () => {
        setText1("");
        setText2("");
        setShowDiff(false);
    };

    const getLineColor = (type: DiffLine["type"]) => {
        switch (type) {
            case "added":
                return {
                    bg:
                        theme.palette.mode === "dark"
                            ? "rgba(46, 160, 67, 0.2)"
                            : "rgba(46, 160, 67, 0.15)",
                    border: theme.palette.success.main,
                };
            case "removed":
                return {
                    bg:
                        theme.palette.mode === "dark"
                            ? "rgba(248, 81, 73, 0.2)"
                            : "rgba(248, 81, 73, 0.15)",
                    border: theme.palette.error.main,
                };
            default:
                return { bg: "transparent", border: "transparent" };
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
                Text Comparer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Compare two texts and highlight the differences. Works offline - all
                processing happens in your browser.
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
                <Button
                    variant="contained"
                    startIcon={<CompareArrowsIcon />}
                    onClick={handleCompare}
                    disabled={!text1.trim() && !text2.trim()}
                >
                    Compare
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ClearIcon />}
                    onClick={handleClear}
                    disabled={!text1 && !text2}
                >
                    Clear
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, value) => value && setViewMode(value)}
                    size="small"
                >
                    <ToggleButton value="unified">Unified</ToggleButton>
                    <ToggleButton value="split">Split</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {!showDiff && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Original Text
                        </Typography>
                        <TextField
                            multiline
                            fullWidth
                            minRows={12}
                            maxRows={20}
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="Paste your original text here..."
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontFamily: "monospace",
                                    fontSize: "0.875rem",
                                },
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Modified Text
                        </Typography>
                        <TextField
                            multiline
                            fullWidth
                            minRows={12}
                            maxRows={20}
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="Paste your modified text here..."
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontFamily: "monospace",
                                    fontSize: "0.875rem",
                                },
                            }}
                        />
                    </Box>
                </Box>
            )}

            {showDiff && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2,
                            p: 1.5,
                            bgcolor: theme.palette.action.hover,
                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body2" data-testid="added-stats">
                            <Box
                                component="span"
                                sx={{ color: theme.palette.success.main, fontWeight: "bold" }}
                            >
                                +{stats.added}
                            </Box>{" "}
                            added
                        </Typography>
                        <Typography variant="body2" data-testid="removed-stats">
                            <Box
                                component="span"
                                sx={{ color: theme.palette.error.main, fontWeight: "bold" }}
                            >
                                -{stats.removed}
                            </Box>{" "}
                            removed
                        </Typography>
                        <Typography variant="body2" data-testid="unchanged-stats">
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                                {stats.unchanged}
                            </Box>{" "}
                            unchanged
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button size="small" onClick={() => setShowDiff(false)}>
                            Edit
                        </Button>
                    </Box>

                    {viewMode === "unified" ? (
                        <Paper
                            variant="outlined"
                            sx={{
                                maxHeight: "500px",
                                overflow: "auto",
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                            }}
                        >
                            {diffResult.map((line, idx) => {
                                const colors = getLineColor(line.type);
                                return (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            bgcolor: colors.bg,
                                            borderLeft: `3px solid ${colors.border}`,
                                            minHeight: "1.5rem",
                                            "&:hover": {
                                                bgcolor:
                                                    line.type === "unchanged"
                                                        ? theme.palette.action.hover
                                                        : colors.bg,
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "40px",
                                                textAlign: "right",
                                                pr: 1,
                                                color: theme.palette.text.secondary,
                                                borderRight: `1px solid ${theme.palette.divider}`,
                                                userSelect: "none",
                                            }}
                                        >
                                            {line.lineNumber.left || ""}
                                        </Box>
                                        <Box
                                            sx={{
                                                width: "40px",
                                                textAlign: "right",
                                                pr: 1,
                                                color: theme.palette.text.secondary,
                                                borderRight: `1px solid ${theme.palette.divider}`,
                                                userSelect: "none",
                                            }}
                                        >
                                            {line.lineNumber.right || ""}
                                        </Box>
                                        <Box
                                            sx={{
                                                width: "20px",
                                                textAlign: "center",
                                                color:
                                                    line.type === "added"
                                                        ? theme.palette.success.main
                                                        : line.type === "removed"
                                                            ? theme.palette.error.main
                                                            : theme.palette.text.secondary,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {line.type === "added"
                                                ? "+"
                                                : line.type === "removed"
                                                    ? "-"
                                                    : " "}
                                        </Box>
                                        <Box sx={{ pl: 1, whiteSpace: "pre-wrap", flex: 1 }}>
                                            {line.content || " "}
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Paper>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 1,
                            }}
                        >
                            <Paper
                                variant="outlined"
                                sx={{
                                    maxHeight: "500px",
                                    overflow: "auto",
                                    fontFamily: "monospace",
                                    fontSize: "0.875rem",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{ p: 1, bgcolor: theme.palette.action.hover }}
                                >
                                    Original
                                </Typography>
                                {diffResult
                                    .filter((l) => l.type !== "added")
                                    .map((line, idx) => {
                                        const colors = getLineColor(line.type);
                                        return (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    display: "flex",
                                                    bgcolor: colors.bg,
                                                    borderLeft: `3px solid ${colors.border}`,
                                                    minHeight: "1.5rem",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "40px",
                                                        textAlign: "right",
                                                        pr: 1,
                                                        color: theme.palette.text.secondary,
                                                        borderRight: `1px solid ${theme.palette.divider}`,
                                                    }}
                                                >
                                                    {line.lineNumber.left || ""}
                                                </Box>
                                                <Box sx={{ pl: 1, whiteSpace: "pre-wrap", flex: 1 }}>
                                                    {line.content || " "}
                                                </Box>
                                            </Box>
                                        );
                                    })}
                            </Paper>
                            <Paper
                                variant="outlined"
                                sx={{
                                    maxHeight: "500px",
                                    overflow: "auto",
                                    fontFamily: "monospace",
                                    fontSize: "0.875rem",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{ p: 1, bgcolor: theme.palette.action.hover }}
                                >
                                    Modified
                                </Typography>
                                {diffResult
                                    .filter((l) => l.type !== "removed")
                                    .map((line, idx) => {
                                        const colors = getLineColor(line.type);
                                        return (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    display: "flex",
                                                    bgcolor: colors.bg,
                                                    borderLeft: `3px solid ${colors.border}`,
                                                    minHeight: "1.5rem",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "40px",
                                                        textAlign: "right",
                                                        pr: 1,
                                                        color: theme.palette.text.secondary,
                                                        borderRight: `1px solid ${theme.palette.divider}`,
                                                    }}
                                                >
                                                    {line.lineNumber.right || ""}
                                                </Box>
                                                <Box sx={{ pl: 1, whiteSpace: "pre-wrap", flex: 1 }}>
                                                    {line.content || " "}
                                                </Box>
                                            </Box>
                                        );
                                    })}
                            </Paper>
                        </Box>
                    )}
                </>
            )}
        </Paper>
    );
}
