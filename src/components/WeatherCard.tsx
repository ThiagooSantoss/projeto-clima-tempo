import { useEffect, useState } from "react";
import { Clima } from "./types/clima";
import { getClima } from "../utils/getClima";
import { Previsao13Dias } from "./Previsao13Dias";

export const WeatherCard = () => {
  const [localizacao, setLocalizacao] = useState("");
  const [clima, setClima] = useState<Clima | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const buscarClima = async (local?: string) => {
    if (!local) {
      setError("Por favor, digite uma localização válida.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setClima(null);

    try {
      const dados = await getClima(local);
      setClima(dados);
    } catch (err) {
      setError("Erro ao buscar o clima.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchClima = async () => {
      setIsLoading(true);
      try {
        const dados = await getClima();
        setClima(dados);
      } catch (err) {
        setError("Erro ao buscar o clima.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClima();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-indigo-500 to-purple-600">
        <p className="text-red-200 text-xl">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-indigo-500 to-purple-600">
        <div className="loader border-t-4 border-b-4 border-white h-12 w-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!clima) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-indigo-500 to-purple-600">
      <div className="max-w-2xl w-full bg-gradient-to-br from-white via-indigo-100 to-purple-200 shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
            Previsão do Tempo
          </h1>

          <div className="relative">
            <input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              placeholder="Digite uma cidade"
              className="w-full p-3 pl-10 border border-indigo-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>

          <button
            onClick={() => buscarClima(localizacao)}
            className="w-full p-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300"
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
  return (
    <div className="justify-center mt-6">
      <h2 className="text-center text-xl font-semibold text-indigo-800 mb-4">
        Clima de Hoje
      </h2>
      <div className="flex items-center gap-4 mb-6 bg-white rounded-lg shadow-lg p-4 border border-indigo-200">
        <img
          src={clima.current.condition.icon}
          alt="Condição do tempo"
          className="w-20 h-20"
        />
        <div>
          <p className="text-gray-700">
            <strong>Cidade:</strong> {clima.location.region}
          </p>
          <p className="text-gray-700">
            <strong>Temperatura Atual:</strong>{" "}
            {Math.round(clima.current.temp_c)}°C
          </p>
          <p className="text-gray-700">
            <strong>Condição:</strong> {clima.current.condition.text}
          </p>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <p>
              <strong>Máx:</strong>{" "}
              <span className="font-bold text-red-500">
                {Math.round(clima.forecast.forecastday[0].day.maxtemp_c)}°C
              </span>
            </p>
            <p>
              <strong>Mín:</strong>{" "}
              <span className="font-bold text-blue-500">
                {Math.round(clima.forecast.forecastday[0].day.mintemp_c)}°C
              </span>
            </p>
          </div>
        </div>
      </div>

      <Previsao13Dias forecast={clima.forecast.forecastday.slice(1)} />
    </div>
  );
};
