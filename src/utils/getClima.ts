import { baseURL } from "../services/url";
import { Clima } from "../components/types/clima";

const getLocationFromBrowser = async (): Promise<string> => {
  if (navigator.geolocation) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          resolve(`${latitude},${longitude}`); // Resolve a Promise com a localização
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          resolve(""); // Retorna uma string vazia em caso de erro
        }
      );
    });
  } else {
    console.error("Geolocalização não é suportada por este navegador.");
    return "";
  }
};

export const getClima = async (localizacao?: string): Promise<Clima> => {
  const key = import.meta.env.VITE_API_KEY;

  let localizacaoBrowser = "";

  if (!localizacao) {
    localizacaoBrowser = await getLocationFromBrowser(); // Aguarda a localização do navegador
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const res: Response = await fetch(
    `${baseURL}/forecast.json?key=${key}&q=${
      localizacao || localizacaoBrowser
    }&lang=pt&days=13`,
    options
  );

  const resJson: Clima = await res.json();

  return resJson;
};