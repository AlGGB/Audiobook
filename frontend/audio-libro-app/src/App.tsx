import React from "react";
import { CssBaseline, Container, Typography } from "@mui/material";
import AudioGenerator from "./components/AudioGenerator";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mt: 4, mb: 4 }}
        >
          Generator de Audiolibros
        </Typography>
        <AudioGenerator />
      </Container>
    </>
  );
};

export default App;
