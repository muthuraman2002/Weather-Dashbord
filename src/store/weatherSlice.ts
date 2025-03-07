import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData, ForecastData } from '../types/weather';
import { getCurrentWeather, getForecast, getWeatherByCoords, getForecastByCoords } from '../api/weatherApi';

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  searchHistory: string[];
  loading: boolean;
  error: string | null;
  selectedCity: string;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  searchHistory: [],
  loading: false,
  error: null,
  selectedCity: '',
};

// Async thunks
export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: string, { rejectWithValue }) => {
    try {
      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      return { weather: weatherData, forecast: forecastData };
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data. Please check the city name and try again.');
    }
  }
);

export const fetchWeatherByLocation = createAsyncThunk(
  'weather/fetchByLocation',
  async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      const weatherData = await getWeatherByCoords(lat, lon);
      const forecastData = await getForecastByCoords(lat, lon);
      return { weather: weatherData, forecast: forecastData };
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data for your location.');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch by city
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.weather;
        state.forecast = action.payload.forecast;
        state.selectedCity = action.payload.weather.name;
        
        // Add to search history if not already present
        if (!state.searchHistory.includes(action.payload.weather.name)) {
          state.searchHistory = [action.payload.weather.name, ...state.searchHistory].slice(0, 5);
        }
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch by location
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.weather;
        state.forecast = action.payload.forecast;
        state.selectedCity = action.payload.weather.name;
        
        // Add to search history if not already present
        if (!state.searchHistory.includes(action.payload.weather.name)) {
          state.searchHistory = [action.payload.weather.name, ...state.searchHistory].slice(0, 5);
        }
      })
      .addCase(fetchWeatherByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;