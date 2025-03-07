import React from 'react';
import { ForecastData } from '../types/weather';
import { formatTemp, formatDate, getWeatherIconUrl, groupForecastByDay } from '../utils/weatherUtils';
import { Wind, Droplets, Calendar, Umbrella } from 'lucide-react';

interface ForecastListProps {
  data: ForecastData;
}

const ForecastList: React.FC<ForecastListProps> = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) return null;

  const dailyForecast = groupForecastByDay(data.list);

  // Get weather condition class
  const getWeatherConditionClass = (description: string) => {
    description = description.toLowerCase();
    if (description.includes('clear')) return 'bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200';
    if (description.includes('cloud')) return 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200';
    if (description.includes('rain') || description.includes('drizzle')) return 'bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200';
    if (description.includes('thunderstorm')) return 'bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200';
    if (description.includes('snow')) return 'bg-gradient-to-b from-indigo-50 to-indigo-100 border-indigo-200';
    if (description.includes('mist') || description.includes('fog')) return 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200';
    return 'bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200';
  };

  // Get precipitation chance text
  const getPrecipitationText = (pop: number) => {
    if (pop < 0.2) return 'Low chance';
    if (pop < 0.5) return 'Moderate chance';
    return 'High chance';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 weather-card">
      <div className="flex items-center mb-6">
        <Calendar size={20} className="mr-2 text-blue-600" />
        <h3 className="text-xl font-semibold">5-Day Forecast</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <div 
            key={index} 
            className={`rounded-lg p-4 border forecast-day-card ${getWeatherConditionClass(day.description)}`}
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-gray-700">{formatDate(day.timestamp)}</p>
              {day.pop > 0.3 && (
                <div className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  <Umbrella size={12} className="mr-1" />
                  {Math.round(day.pop * 100)}%
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center my-3">
              <img 
                src={getWeatherIconUrl(day.icon)} 
                alt={day.description}
                className="w-16 h-16 my-1"
              />
              <p className="capitalize text-sm font-medium text-center text-gray-700 mt-1">{day.description}</p>
            </div>
            
            <div className="text-center mb-3">
              <p className="font-bold text-xl text-gray-800">{formatTemp(day.temp)}</p>
              <p className="text-sm text-gray-600 flex justify-center items-center">
                <span className="text-red-500 font-medium">{formatTemp(day.temp_max)}</span>
                <span className="mx-1">•</span>
                <span className="text-blue-500 font-medium">{formatTemp(day.temp_min)}</span>
              </p>
            </div>
            
            <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
              <div className="flex items-center">
                <Wind size={12} className="mr-1 text-blue-500" />
                <span>{day.wind_speed} m/s</span>
              </div>
              <div className="flex items-center">
                <Droplets size={12} className="mr-1 text-blue-500" />
                <span>{day.humidity}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;