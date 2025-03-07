import React from 'react';
import { Cloud } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <Cloud 
          size={24} 
          className="text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        />
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;