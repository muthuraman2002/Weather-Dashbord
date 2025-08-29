import React from 'react';
import { Wind, Droplets, Calendar, Umbrella } from 'lucide-react';

interface ForecastListProps {
  data: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weathercode: number[];
  };
}

const weatherCodeMap: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  80: 'Rain showers',
  95: 'Thunderstorm',
  // Add more codes as needed
};

const ForecastList: React.FC<ForecastListProps> = ({ data }) => {
  if (!data || !data.time || data.time.length === 0) return null;

  // Get weather condition class
  const getWeatherConditionClass = (code: number) => {
    if (code === 0) return 'bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200';
    if ([1, 2, 3].includes(code)) return 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200';
    if ([61, 63, 65, 80].includes(code)) return 'bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200';
    if (code === 95) return 'bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200';
    if ([45, 48].includes(code)) return 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200';
    return 'bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 weather-card">
      <div className="flex items-center mb-6">
        <Calendar size={20} className="mr-2 text-blue-600" />
        <h3 className="text-xl font-semibold">7-Day Forecast</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {data.time.map((date, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 border forecast-day-card ${getWeatherConditionClass(data.weathercode[idx])}`}
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-gray-700">{date}</p>
              {data.precipitation_sum[idx] > 2 && (
                <div className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  <Umbrella size={12} className="mr-1" />
                  {data.precipitation_sum[idx]} mm
                </div>
              )}
            </div>

            <div className="flex flex-col items-center my-3">
              {/* You can use a weather icon here based on weathercode if you want */}
              <p className="capitalize text-sm font-medium text-center text-gray-700 mt-1">
                {weatherCodeMap[data.weathercode[idx]] || 'Unknown'}
              </p>
            </div>

            <div className="text-center mb-3">
              <p className="font-bold text-xl text-gray-800">{data.temperature_2m_max[idx]}°C</p>
              <p className="text-sm text-gray-600 flex justify-center items-center">
                <span className="text-red-500 font-medium">{data.temperature_2m_max[idx]}°</span>
                <span className="mx-1">•</span>
                <span className="text-blue-500 font-medium">{data.temperature_2m_min[idx]}°</span>
              </p>
            </div>

            <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
              <div className="flex items-center">
                <Wind size={12} className="mr-1 text-blue-500" />
                <span>Precip: {data.precipitation_sum[idx]} mm</span>
              </div>
              <div className="flex items-center">
                <Droplets size={12} className="mr-1 text-blue-500" />
                <span>Code: {data.weathercode[idx]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;