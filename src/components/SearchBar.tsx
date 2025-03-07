import React, { useState } from 'react';
import { MapPin, Search, History, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  searchHistory: string[];
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationClick, 
  searchHistory,
  loading 
}) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowHistory(false);
    }
  };

  const handleHistoryItemClick = (city: string) => {
    onSearch(city);
    setShowHistory(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-600">Search for weather</h2>
        {searchHistory.length > 0 && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs flex items-center text-blue-600 hover:text-blue-800"
          >
            <History size={14} className="mr-1" />
            Recent searches
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => searchHistory.length > 0 && setShowHistory(true)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 pr-10 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 search-input shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg custom-scrollbar max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-medium text-gray-500">Recent searches</span>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </div>
              <ul>
                {searchHistory.map((city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center text-gray-700"
                    onClick={() => handleHistoryItemClick(city)}
                  >
                    <History size={14} className="mr-2 text-gray-400" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 shadow-sm transition-colors"
        >
          <Search size={20} />
        </button>
        <button
          type="button"
          onClick={onLocationClick}
          disabled={loading}
          className="ml-2 bg-white hover:bg-gray-100 border border-gray-300 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 shadow-sm transition-colors"
          title="Use current location"
        >
          <MapPin size={20} className="text-blue-600" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;