import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md flex items-start justify-between animate-pulse-blue">
      <div className="flex items-center">
        <AlertCircle className="mr-3 text-red-500 flex-shrink-0" size={24} />
        <div>
          <h3 className="font-semibold mb-1">Error</h3>
          <p className="text-red-600">{message}</p>
        </div>
      </div>
      <button 
        onClick={onDismiss}
        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full hover:bg-red-100 transition-colors"
        aria-label="Dismiss error"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ErrorMessage;