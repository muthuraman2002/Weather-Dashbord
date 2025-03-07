import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

// OpenWeather API key
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Create axios instance
const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric', // Use metric units by default
  },
});

// Get current weather data by city name
export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get<WeatherData>('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 5-day forecast data by city name
export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await weatherApi.get<ForecastData>('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Get weather by geolocation
export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get<WeatherData>('/weather', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

// Get forecast by geolocation
export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await weatherApi.get<ForecastData>('/forecast', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};