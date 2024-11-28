import { useEffect } from "react";

import { getLocalizacao } from "../utils/getLocalizacao";

export const WeatherCard = () => {
  useEffect(() => {
    getLocalizacao("Rio_de_Janeiro");
  }, []);
  return <h1>Teste</h1>;
};
