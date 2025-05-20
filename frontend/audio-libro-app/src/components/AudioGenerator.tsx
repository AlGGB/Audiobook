import React, { useState } from "react";
import { generateAudio, getAudioUrl } from "../services/Api";
import {
  Button,
  TextField,
  Box,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";

const AudioGenerator: React.FC = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("es");
  const [slow, setSlow] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Por favor ingresa algún texto");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await generateAudio(text, lang, slow);
      setAudioUrl(getAudioUrl(response.data.filename));
    } catch (err) {
      setError("Error al generar el audio. Por favor intenta nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Texto para convertir a audio"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Idioma</InputLabel>
          <Select
            value={lang}
            label="Idioma"
            onChange={(e) => setLang(e.target.value as string)}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">Inglés</MenuItem>
            <MenuItem value="fr">Francés</MenuItem>
            <MenuItem value="de">Alemán</MenuItem>
            <MenuItem value="it">Italiano</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Velocidad</InputLabel>
          <Select
            value={slow ? "slow" : "normal"}
            label="Velocidad"
            onChange={(e) => setSlow(e.target.value === "slow")}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="slow">Lenta</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<PlayCircleOutlineIcon />}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Generar Audio
        </Button>

        {loading && <LinearProgress sx={{ mt: 2 }} />}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </form>

      {audioUrl && (
        <Box sx={{ mt: 4 }}>
          <ReactPlayer url={audioUrl} controls width="100%" height="50px" />
          <Button
            variant="outlined"
            component="a"
            href={audioUrl}
            download="audiolibro.mp3"
            sx={{ mt: 2 }}
          >
            Descargar Audio
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AudioGenerator;
