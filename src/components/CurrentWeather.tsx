// import React from 'react';
// import { WeatherData } from '../types/weather';
// import { formatTemp, formatDate, formatTime, getWeatherIconUrl } from '../utils/weatherUtils';
// import { Wind, Droplets, Eye, Sunrise, Sunset, Thermometer, Gauge, MapPin } from 'lucide-react';

// interface CurrentWeatherProps {
//   data: WeatherData;
// }

// const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
//   if (!data) return null;
// console.log(data);
//   // Determine background gradient based on temperature
//   const getBgGradient = (temp: number) => {
//     if (temp > 30) return 'from-orange-500 to-red-600'; // Hot
//     if (temp > 20) return 'from-yellow-400 to-orange-500'; // Warm
//     if (temp > 10) return 'from-blue-400 to-blue-500'; // Mild
//     if (temp > 0) return 'from-blue-500 to-blue-600'; // Cool
//     return 'from-blue-600 to-blue-700'; // Cold
//   };

//   // Get weather condition class
//   const getWeatherConditionClass = () => {
//     const WeatherData=data?.weather||[{}];
//     const condition = WeatherData[0].main.toLowerCase();
//     if (condition.includes('clear')) return 'bg-gradient-to-r from-blue-400 to-blue-500';
//     if (condition.includes('cloud')) return 'bg-gradient-to-r from-gray-400 to-gray-500';
//     if (condition.includes('rain') || condition.includes('drizzle')) return 'bg-gradient-to-r from-blue-600 to-blue-700';
//     if (condition.includes('thunderstorm')) return 'bg-gradient-to-r from-purple-600 to-purple-700';
//     if (condition.includes('snow')) return 'bg-gradient-to-r from-blue-200 to-blue-300';
//     if (condition.includes('mist') || condition.includes('fog')) return 'bg-gradient-to-r from-gray-300 to-gray-400';
//     return 'bg-gradient-to-r from-blue-500 to-blue-600';
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden weather-card">
//       <div className={`p-6 ${getWeatherConditionClass()} text-white`}>
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center">
//           <div className="mb-4 md:mb-0">
//             <div className="flex items-center">
//               <MapPin size={18} className="mr-1" />
//               <h2 className="text-3xl font-bold">{data.name}, {data.sys.country}</h2>
//             </div>
//             <p className="text-lg opacity-90">{formatDate(data.dt)}</p>
//           </div>
//           <div className="text-right flex flex-row md:flex-col items-center md:items-end">
//             <div className="text-6xl font-bold mr-4 md:mr-0">{formatTemp(data.main.temp)}</div>
//             <p className="text-xl">Feels like {formatTemp(data.main.feels_like)}</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex flex-col sm:flex-row items-center mb-6">
//           <div className="flex items-center mb-4 sm:mb-0">
//             <img 
//               src={getWeatherIconUrl(data.weather[0].icon)} 
//               alt={data.weather[0].description}
//               className="w-20 h-20"
//             />
//             <div className="ml-4">
//               <p className="text-2xl font-semibold capitalize">{data.weather[0].description}</p>
//               <div className="flex items-center text-gray-600 mt-1">
//                 <Thermometer size={16} className="mr-1" />
//                 <p>
//                   H: <span className="font-medium">{formatTemp(data.main.temp_max)}</span> 
//                   <span className="mx-1">•</span> 
//                   L: <span className="font-medium">{formatTemp(data.main.temp_min)}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="sm:ml-auto flex items-center bg-blue-50 px-4 py-2 rounded-full">
//             <Gauge size={18} className="mr-2 text-blue-600" />
//             <span className="text-sm font-medium">
//               Pressure: {data.main.pressure} hPa
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
//             <div className="flex items-center text-gray-500 mb-2">
//               <Wind size={18} className="mr-2 text-blue-500" />
//               <span className="font-medium">Wind</span>
//             </div>
//             <p className="text-lg font-medium">{data.wind.speed} m/s</p>
//             <p className="text-xs text-gray-500 mt-1">Direction: {data.wind.deg}°</p>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
//             <div className="flex items-center text-gray-500 mb-2">
//               <Droplets size={18} className="mr-2 text-blue-500" />
//               <span className="font-medium">Humidity</span>
//             </div>
//             <p className="text-lg font-medium">{data.main.humidity}%</p>
//             <p className="text-xs text-gray-500 mt-1">
//               {data.main.humidity < 30 ? 'Dry' : data.main.humidity > 70 ? 'Humid' : 'Normal'}
//             </p>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
//             <div className="flex items-center text-gray-500 mb-2">
//               <Eye size={18} className="mr-2 text-blue-500" />
//               <span className="font-medium">Visibility</span>
//             </div>
//             <p className="text-lg font-medium">{(data.visibility / 1000).toFixed(1)} km</p>
//             <p className="text-xs text-gray-500 mt-1">
//               {data.visibility >= 10000 ? 'Clear' : data.visibility >= 5000 ? 'Moderate' : 'Poor'}
//             </p>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
//             <div className="flex items-center text-gray-500 mb-2">
//               <Sunrise size={18} className="mr-2 text-blue-500" />
//               <span className="font-medium">Sun</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex flex-col items-center">
//                 <Sunrise size={14} className="text-orange-500 mb-1" />
//                 <p className="text-sm font-medium">{formatTime(data.sys.sunrise)}</p>
//               </div>
//               <div className="text-gray-300 mx-2">|</div>
//               <div className="flex flex-col items-center">
//                 <Sunset size={14} className="text-orange-700 mb-1" />
//                 <p className="text-sm font-medium">{formatTime(data.sys.sunset)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentWeather;
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

  // Simple gradient based on temperature
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