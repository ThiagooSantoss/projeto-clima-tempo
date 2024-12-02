import { baseURL } from "../services/url";
import { Clima } from "../components/types/clima";

const getLocationFromBrowser = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        return `${latitude},${longitude}`;
      },
      (error) => {
        return "";
      }
    );
  } else {
    console.error("Geolocalização não é suportada por este navegador.");
    return "";
  }
};

export const getLocalizacao = async (localizacao: string): Promise<Clima> => {
  const key = import.meta.env.VITE_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const res = await fetch(
    `${baseURL}/current.json?key=${key}&q=${
      localizacao || getLocationFromBrowser()
    }&lang=${"pt"}`,
    options
  );
  const resJson = await res.json();
  console.log(resJson);

  return resJson;
};
