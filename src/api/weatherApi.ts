import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

// OpenWeather API key
// const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// // Create axios instance
// const weatherApi = axios.create({
//   baseURL: BASE_URL,
//   params: {
//     appid: API_KEY,
//     units: 'metric', // Use metric units by default
//   },
// });
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

// Create axios instance
const weatherApi = axios.create({
  baseURL: BASE_URL,
});

// Get current weather data by city name
// export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
//   try {
//     const response = await weatherApi.get<WeatherData>('/weather', {
//       params: { q: city },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching current weather:', error);
//     throw error;
//   }
// };
// export const getCurrentWeather = async (city: string): Promise<any> => {
//   try {
//     // 1. First convert city -> lat/lon (using free Open-Meteo geocoding)
//     const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
//       params: { name: city, count: 1 },
//     });
// // console.log(geoRes)
//     if (!geoRes.data.results || geoRes.data.results.length === 0) {
//       throw new Error("City not found");
//     }

//     const { latitude, longitude } = geoRes.data.results[0];

//     // 2. Fetch weather using lat/lon
//     console.log(latitude, longitude)
//     const response = await weatherApi.get("", {
//       params: {
//         latitude,
//         longitude,
//         current_weather: true,
//         timezone: "auto",
//       },
//     });
// console.log(response.data)
//     return response?.data||{};
//   } catch (error) {
//     console.error("Error fetching current weather:", error);
//     throw error;
//   }
// };
// // Get 5-day forecast data by city name
// //curl "https://api.open-meteo.com/v1/forecast?latitude=13.0449408&longitude=80.19968&current_weather=true"

// export const getForecast = async (city: string): Promise<ForecastData> => {
//   try {
//     const response = await weatherApi.get<ForecastData>('/forecast', {
//       params: { q: city },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching forecast:', error);
//     throw error;
//   }
// };
// ...existing code...

// Helper function to get latitude and longitude from city name
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

// ...existing code...
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