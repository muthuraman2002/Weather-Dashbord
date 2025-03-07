import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../store/weatherSlice';
import { useWeather } from '../hooks/useWeather';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastChart from './ForecastChart';
import ForecastList from './ForecastList';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import { Info, X } from 'lucide-react';

const WeatherDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const {
    currentWeather,
    forecast,
    loading,
    error,
    searchHistory,
    getWeatherByCity,
    getWeatherByCurrentLocation,
  } = useWeather();
  
  const [showApiKeyInfo, setShowApiKeyInfo] = useState(true);

  const handleDismissError = () => {
    dispatch(clearError());
  };

  return (
    <div className="space-y-6">
      {showApiKeyInfo && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-md mb-6 flex items-start justify-between">
          <div className="flex">
            <Info className="text-yellow-500 mr-3 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">API Key Required</h3>
              <p className="text-yellow-700">
                Please replace the placeholder API key in <code className="bg-yellow-100 px-1 py-0.5 rounded">src/api/weatherApi.ts</code> with your actual OpenWeather API key.
              </p>
              <p className="text-yellow-600 text-sm mt-1">
                You can get a free API key by signing up at <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenWeather</a>.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowApiKeyInfo(false)}
            className="text-yellow-500 hover:text-yellow-700 focus:outline-none p-1 rounded-full hover:bg-yellow-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex justify-center mb-8">
        <SearchBar
          onSearch={getWeatherByCity}
          onLocationClick={getWeatherByCurrentLocation}
          searchHistory={searchHistory}
          loading={loading}
        />
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={handleDismissError} />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {currentWeather && (
            <div className="space-y-8">
              <CurrentWeather data={currentWeather} />
              
              {forecast && (
                <>
                  <ForecastChart data={forecast} />
                  <ForecastList data={forecast} />
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;