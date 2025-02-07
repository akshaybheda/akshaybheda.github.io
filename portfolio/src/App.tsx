import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./components/Homepage/Homepage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout.tsx";
import Project from "./components/Projects/Project.tsx";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/project" element={<Project />}></Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  </StrictMode>
);
