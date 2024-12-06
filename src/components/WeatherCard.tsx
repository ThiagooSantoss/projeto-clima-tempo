import { useEffect, useRef, useState } from "react";
import { Clima } from "./types/clima";
import { getClimaFuturo } from "../utils/getClimaFuturo";
import { Previsao14Dias } from "./Previsao14Dias";

export const WeatherCard = () => {
  const [localizacao, setLocalizacao] = useState("");
  const [clima, setClima] = useState<Clima | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedData = useRef(false);

  const buscarClima = async (local?: string) => {
    setError(null);
    setClima(null);

    try {
      const dados = await getClimaFuturo(local);
      setClima(dados);
    } catch (err) {
      setError("Erro ao buscar o clima.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!clima) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Previsão do Tempo
          </h1>

          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            placeholder="Digite uma cidade"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => buscarClima(localizacao)}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Buscar
          </button>

          {clima && <ClimaAtual clima={clima} />}
        </div>
      </div>
    </div>
  );
};

const ClimaAtual = ({ clima }: { clima: Clima }) => {
  const diasPrevisao = clima.forecast.forecastday.slice(1);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Clima Atual</h2>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={clima.current.condition.icon}
          alt="Condição do tempo"
          className="w-16 h-16"
        />
        <div>
          <p className="text-gray-700">
            <strong>Cidade:</strong> {clima.location.region}
          </p>
          <p className="text-gray-700">
            <strong>Temperatura:</strong> {Math.round(clima.current.temp_c)}°C
          </p>
          <p className="text-gray-700">
            <strong>Condição:</strong> {clima.current.condition.text}
          </p>
        </div>
      </div>

      {diasPrevisao.length > 0 && <Previsao14Dias forecast={diasPrevisao} />}
    </div>
  );
};
