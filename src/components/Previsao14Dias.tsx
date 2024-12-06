import React from "react";
import { ForecastDay } from "../components/types/clima";

interface Props {
  forecast: ForecastDay[];
}

export const Previsao14Dias: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Previsão para os próximos 14 dias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">

        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 text-center border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2">{day.date}</h3>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-16 h-16 mx-auto mb-2"
            />
            <p className="text-gray-700 mb-2">{day.day.condition.text}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Máx: <span className="font-bold text-red-500">{day.day.maxtemp_c}°C</span></p>
              <p>Mín: <span className="font-bold text-blue-500">{day.day.mintemp_c}°C</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
