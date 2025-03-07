import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchWeatherByCity, fetchWeatherByLocation } from '../store/weatherSlice';

export const useWeather = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    searchHistory,
    selectedCity 
  } = useSelector((state: RootState) => state.weather);

  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation && !currentWeather) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            fetchWeatherByLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to a major city if geolocation fails
          dispatch(fetchWeatherByCity('London'));
        }
      );
    } else if (!currentWeather) {
      // Fallback if geolocation is not available
      dispatch(fetchWeatherByCity('London'));
    }
  }, [dispatch, currentWeather]);

  const getWeatherByCity = (city: string) => {
    dispatch(fetchWeatherByCity(city));
  };

  const getWeatherByCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            fetchWeatherByLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          );
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return {
    currentWeather,
    forecast,
    loading,
    error,
    searchHistory,
    selectedCity,
    getWeatherByCity,
    getWeatherByCurrentLocation,
  };
};