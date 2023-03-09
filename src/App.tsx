import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Layout from "./components/Layout";
import { Box, MantineProvider } from "@mantine/core";

import "./App.css";
import "./override.css";
import { HomePage } from "./pages/HomePage";
import { OnboardingPage } from "./pages/OnboardingPage";

const App = (): JSX.Element => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "Nunito, sans serif",
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        components: {
          Text: {
            styles: {
              root: {
                color: "#212529",
              },
            },
          },
        },
      }}
    >
      <Box className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/main" />} />
            <Route path="main" element={<Main />} />
            <Route path="home" element={<HomePage />} />
            <Route path="*" element={<Box sx={{ height: "93%" }}></Box>} />
          </Route>
          <Route path="onboarding" element={<OnboardingPage />} />
        </Routes>
      </Box>
    </MantineProvider>
  );
};

export default App;
