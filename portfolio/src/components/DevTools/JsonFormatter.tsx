import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CompressIcon from "@mui/icons-material/Compress";
import ClearIcon from "@mui/icons-material/Clear";

export default function JsonFormatter() {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (minify = false) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = minify
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
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
    setError(null);
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
        JSON Formatter & Validator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Paste your JSON to format, validate, or minify. Works offline - all
        processing happens in your browser.
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<FormatAlignLeftIcon />}
          onClick={() => formatJson(false)}
          disabled={!input.trim()}
        >
          Format
        </Button>
        <Button
          variant="outlined"
          startIcon={<CompressIcon />}
          onClick={() => formatJson(true)}
          disabled={!input.trim()}
        >
          Minify
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
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Input JSON
          </Typography>
          <TextField
            multiline
            fullWidth
            minRows={12}
            maxRows={20}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"paste": "your JSON here"}'
            error={!!error}
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
            placeholder="Formatted JSON will appear here"
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

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <strong>Invalid JSON:</strong> {error}
        </Alert>
      )}

      {output && !error && (
        <Alert severity="success" sx={{ mt: 2 }}>
          ✓ Valid JSON ({output.split("\n").length} lines,{" "}
          {new Blob([output]).size} bytes)
        </Alert>
      )}
    </Paper>
  );
}
