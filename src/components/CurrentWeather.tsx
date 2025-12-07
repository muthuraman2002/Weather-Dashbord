import React from 'react';
import { Wind, Gauge, MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  data: {
    latitude: number;
    longitude: number;
    timezone: string;
    elevation: number;
    current_weather: {
      time: string;
      temperature: number;
      windspeed: number;
      winddirection: number;
      weathercode: number;
      is_day: number;
    };
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

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data || !data.current_weather) return null;
  const { temperature, windspeed, winddirection, time, weathercode, is_day } = data.current_weather;

  // Simple gradient based on temperature.
  const getBgGradient = (temp: number) => {
    if (temp > 30) return 'from-orange-500 to-red-600';
    if (temp > 20) return 'from-yellow-400 to-orange-500';
    if (temp > 10) return 'from-blue-400 to-blue-500';
    if (temp > 0) return 'from-blue-500 to-blue-600';
    return 'from-blue-600 to-blue-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden weather-card">
      <div className={`p-6 bg-gradient-to-r ${getBgGradient(temperature)} text-white`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <MapPin size={18} className="mr-1" />
              <h2 className="text-3xl font-bold">
                Lat: {data.latitude}, Lon: {data.longitude}
              </h2>
            </div>
            <p className="text-lg opacity-90">{data.timezone}</p>
            <p className="text-lg opacity-90">Elevation: {data.elevation}m</p>
          </div>
          <div className="text-right flex flex-row md:flex-col items-center md:items-end">
            <div className="text-6xl font-bold mr-4 md:mr-0">{temperature}°C</div>
            <p className="text-xl">Time: {time}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center text-gray-500 mb-2">
              <Wind size={18} className="mr-2 text-blue-500" />
              <span className="font-medium">Wind</span>
            </div>
            <p className="text-lg font-medium">{windspeed} m/s</p>
            <p className="text-xs text-gray-500 mt-1">Direction: {winddirection}°</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center text-gray-500 mb-2">
              <Gauge size={18} className="mr-2 text-blue-600" />
              <span className="font-medium">Weather</span>
            </div>
            <p className="text-lg font-medium">{weatherCodeMap[weathercode] || 'Unknown'}</p>
            <p className="text-xs text-gray-500 mt-1">{is_day ? 'Day' : 'Night'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
