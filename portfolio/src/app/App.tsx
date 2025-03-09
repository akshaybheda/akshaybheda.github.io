import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./Layout.tsx";
import Project from "../components/Projects/Project.tsx";
import Homepage from "../components/Homepage/Homepage.tsx";
import Opensource from "../components/OpenSource/OpenSource.tsx";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <Layout>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/project" element={<Project />}></Route>
            <Route path="/opensource" element={<Opensource />}></Route>
          </Routes>
        </HashRouter>
      </Layout>
    </ThemeProvider>
  </StrictMode>
);
