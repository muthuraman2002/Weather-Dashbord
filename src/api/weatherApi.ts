import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

const BASE_URL = "https://api.open-meteo.com/v1/forecast";
// Create axios instance
const weatherApi = axios.create({
  baseURL: BASE_URL,
});
// Function to get latitude and longitude by city name
export const getLatLonByCity = async (city: string): Promise<{ latitude: number; longitude: number }> => {
  const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
    params: { name: city, count: 1 },
  });
  if (!geoRes.data.results || geoRes.data.results.length === 0) {
    throw new Error("City not found");
  }
  const { latitude, longitude } = geoRes.data.results[0];
  return { latitude, longitude };
};
// Get current weather data by city name
export const getCurrentWeather = async (city: string): Promise<any> => {
  try {
    const { latitude, longitude } = await getLatLonByCity(city);
    const response = await weatherApi.get("", {
      params: {
        latitude,
        longitude,
        current_weather: true,
        timezone: "auto",
      },
    });
    // console.log(response.data)
    return response?.data || {};
  } catch (error) {
    console.log("Error fetching current weather:", error);
    throw error;
  }
};
// Get 5-day forecast data by city name
export const getForecast = async (city: string): Promise<any> => {
  try {
    const { latitude, longitude } = await getLatLonByCity(city);
    const response = await weatherApi.get("", {
      params: {
        latitude,
        longitude,
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_sum",
          "weathercode"
        ].join(","),
        timezone: "auto",
      },
    });
    // console.log(response.data)
    return response?.data?.daily||{};
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};
// Get weather by geolocation
export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get<WeatherData>('', {
      params: { latitude:lat, longitude:lon },
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
      params: { latitude:lat, longitude:lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};