import { useEffect } from "react";

export const WeatherCard = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.hgbrasil.com/weather/js/hg-weather-1.0.js";
    script.type = "text/javascript";
    script.async = true;

    // Função que é chamada quando o script é carregado
    script.onload = () => {
      if (window.HGWeather) {
        window.HGWeather.initialize({
          results: {
            city_name: "Santos", // Passa o nome da cidade ao inicializar
          },
        });
      }
    };

    // Adiciona o script ao documento
    document.body.appendChild(script);

    // Remove o script quando o componente for desmontado
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <h1>HG Weather</h1>

      <div className="hg-weather" data-key="development" data-woeid="455827">
        <span data-weather="message">
          Obtendo...
          <br />
        </span>
        <span data-weather="city">Obtendo cidade</span>{" "}
        <span data-weather="temp">00</span>º C<br />
        <span data-weather="description">Obtendo tempo...</span>
        <br />
        Nascer do Sol: <span data-weather="sunrise">00:00</span> - Pôr do Sol:{" "}
        <span data-weather="sunset">00:00</span>
        <br />
        Velocidade do vento: <span data-weather="wind_speedy">-- km/h</span>
        <br />
        <img
          src="http://assets.api.hgbrasil.com/weather/images/44.png"
          data-weather="image"
        />
        <br />
      </div>
    </>
  );
};
