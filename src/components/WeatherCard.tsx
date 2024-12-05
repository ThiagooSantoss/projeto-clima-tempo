import { useEffect, useState } from "react";

import { Clima } from "./types/clima";
import { getClimaFuturo } from "../utils/getClimaFuturo";
import { Previsao14Dias } from "./Previsao14Dias";

export const WeatherCard = () => {
  const [localizacao, setLocalizacao] = useState("");
  const [clima, setClima] = useState<Clima | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buscarClima = async () => {
    if (!localizacao.trim()) {
      setError("Por favor, insira uma localização válida.");
      return;
    }

    setError(null);
    setClima(null);

    try {
      const dados = await getClimaFuturo(localizacao);
      setClima(dados);
    } catch (err) {
      setError("Erro ao buscar o clima.");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const dados = await getClimaFuturo();
        setClima(dados);
      } catch (err) {
        setError("Erro ao buscar o clima.");
        console.error(err);
      }
    };

    fetchClima();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!clima) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Buscar Clima
      </h1>

      <input
        type="text"
        value={localizacao}
        onChange={(e) => setLocalizacao(e.target.value)}
        placeholder="Digite uma cidade"
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={() => buscarClima()}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Buscar
      </button>

      {clima && <ClimaAtual clima={clima} />}
    </div>
  );
};

const ClimaAtual = ({ clima }: { clima: Clima }) => {

const primeiroElemento = clima.forecast.forecastday.shift()
 
  return (
    <>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Clima Atual
        </h2>
        <p className="text-gray-700">
          <strong className="font-medium">Cidade:</strong>{" "}
          {clima.location.region}
        </p>
        <p className="text-gray-700">
          <strong className="font-medium">Temperatura:</strong>{" "}
          {clima.current.temp_c}°C
        </p>
        <p className="text-gray-700">
          <strong className="font-medium">Condição:</strong>{" "}
          {clima.current.condition.text}
        </p>
        <img
          src={clima.current.condition.icon}
          alt="Condição do tempo"
          className="mt-4"
        />
      </div>

      {clima.forecast && (
        <Previsao14Dias forecast={clima.forecast.forecastday} />
      )}
    </>
  );
};
