import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import WeatherDashboard from './components/WeatherDashboard';
import { Cloud, Github } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <Cloud size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold">Weather Dashboard</h1>
            </div>
            <a 
              href="https://github.com/muthuraman2002" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm hover:text-blue-200 transition-colors"
            >
              <Github size={18} className="mr-1" />
              <span>View on GitHub</span>
            </a>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">
          <WeatherDashboard />
        </main>
        <footer className="bg-gray-800 text-white p-6 mt-auto">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center justify-center md:justify-start">
                  <Cloud size={24} className="mr-2 text-blue-400" />
                  <span className="font-semibold text-lg">Weather Dashboard</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Real-time weather data at your fingertips</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">Weather data provided by Open-Meteo API</p>
                <p className="text-gray-500 text-xs mt-1">© {new Date().getFullYear()} Weather Dashboard. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;