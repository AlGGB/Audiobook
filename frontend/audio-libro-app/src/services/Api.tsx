import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateAudio = (
  text: string,
  lang: string = "es",
  slow: boolean = false
) => {
  return api.post("/generate-audio", { text, lang, slow });
};

export const getAudioUrl = (filename: string) => {
  return `http://localhost:5000/api/audio/${filename}`;
};
