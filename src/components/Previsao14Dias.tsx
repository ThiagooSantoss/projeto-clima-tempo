import React from "react";
import { ForecastDay } from "../components/types/clima";

interface Props {
  forecast: ForecastDay[];
}

export const Previsao14Dias: React.FC<Props> = ({ forecast }) => {
  // Filtrar para remover o dia de hoje
  const hoje = new Date();
  const previsaoSemHoje = forecast.filter((day) => {
    const dataPrevisao = new Date(day.date);
    return (
      dataPrevisao.getDate() !== hoje.getDate() ||
      dataPrevisao.getMonth() !== hoje.getMonth() ||
      dataPrevisao.getFullYear() !== hoje.getFullYear()
    );
  });

  // Garantir 14 dias de previsão
  const previsaoCompleta = previsaoSemHoje.slice(0, 14);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        Previsão para os próximos 14 dias
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {previsaoCompleta.map((day, index) => (
          <div
          key={index}
          className="bg-gradient-to-br from-blue-300 via-purple-300 to-blue-100 rounded-lg shadow-lg p-4 text-center border border-gray-300"
        >
            {/* Formata a data para pt-BR */}
            <h3 className="text-lg font-semibold mb-2">
              {new Intl.DateTimeFormat("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              }).format(new Date(day.date))}
            </h3>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-16 h-16 mx-auto mb-2"
            />
            <p className="text-gray-700 mb-2">{day.day.condition.text}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <p>
                Máx:{" "}
                <span className="font-bold text-red-500">
                {Math.round(day.day.maxtemp_c)}°C
                </span>
              </p>
              <p>
                Mín:{" "}
                <span className="font-bold text-blue-500">
                {Math.round(day.day.mintemp_c)}°C
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
