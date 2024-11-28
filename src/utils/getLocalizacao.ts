import { baseURL } from "../services/url";

export const getLocalizacao = async (localizacao: string) => {
  const key = import.meta.env.VITE_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const res = await fetch(
    `${baseURL}/current.json?key=${key}&q=${localizacao}`,
    options
  );
  const resJson = await res.json();
  return resJson;
};
