// Format temperature
export const formatTemp = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

// Format date
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Format time
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get weather icon URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Group forecast by day
export const groupForecastByDay = (forecastList: any[]) => {
  const grouped = forecastList.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return Object.keys(grouped).map(date => {
    const items = grouped[date];
    // Get the middle of the day forecast (around noon) or the first one
    const middayForecast = items.find((item: any) => 
      item.dt_txt.includes('12:00:00')
    ) || items[0];
    
    // Calculate average precipitation probability
    const avgPop = items.reduce((sum: number, item: any) => sum + item.pop, 0) / items.length;
    
    return {
      date,
      timestamp: middayForecast.dt,
      temp: middayForecast.main.temp,
      feels_like: middayForecast.main.feels_like,
      temp_min: Math.min(...items.map((i: any) => i.main.temp_min)),
      temp_max: Math.max(...items.map((i: any) => i.main.temp_max)),
      humidity: middayForecast.main.humidity,
      description: middayForecast.weather[0].description,
      icon: middayForecast.weather[0].icon,
      wind_speed: middayForecast.wind.speed,
      pop: avgPop, // Probability of precipitation
    };
  });
};

// Get chart data for temperature forecast
export const getTemperatureChartData = (forecastList: any[]) => {
  // Take the next 24 hours (8 data points, as each is 3 hours apart)
  const next24Hours = forecastList.slice(0, 8);
  
  const labels = next24Hours.map(item => 
    new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit' })
  );
  
  const temperatures = next24Hours.map(item => Math.round(item.main.temp));
  const feelsLike = next24Hours.map(item => Math.round(item.main.feels_like));
  
  return {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Feels Like (°C)',
        data: feelsLike,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        borderDash: [5, 5],
      },
    ],
  };
};

// Get weather condition description
export const getWeatherConditionDescription = (condition: string, temp: number): string => {
  condition = condition.toLowerCase();
  
  if (condition.includes('clear')) {
    if (temp > 30) return 'Hot and sunny';
    if (temp > 20) return 'Warm and sunny';
    if (temp > 10) return 'Mild and clear';
    return 'Clear but cool';
  }
  
  if (condition.includes('cloud')) {
    if (condition.includes('broken') || condition.includes('scattered')) {
      return 'Partly cloudy';
    }
    return 'Cloudy';
  }
  
  if (condition.includes('rain')) {
    if (condition.includes('light')) return 'Light rain';
    if (condition.includes('heavy')) return 'Heavy rain';
    return 'Rainy';
  }
  
  if (condition.includes('thunderstorm')) return 'Thunderstorms';
  if (condition.includes('snow')) return 'Snowy';
  if (condition.includes('mist') || condition.includes('fog')) return 'Foggy';
  
  return condition;
};