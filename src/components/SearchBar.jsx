import React from "react";

const SearchBar = ({ searchLocation, setSearchLocation, selectedDate, setSelectedDate }) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-full shadow-lg w-full max-w-2xl">
      {/* Destination Input */}
      <div className="relative flex-1">
        <i className="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
        <input
          type="text"
          placeholder="Enter Destination (e.g., Goa, Manali)"
          className="w-full pl-12 pr-4 py-3 text-gray-700 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      {/* Date Input */}
      <div className="relative flex-1 ml-4">
        <i className="fas fa-calendar-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
        <input
          type="date"
          className="w-full pl-12 pr-4 py-3 text-gray-700 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button className="ml-4 px-6 py-3 bg-orange-500 text-white text-lg font-medium rounded-full shadow-md hover:bg-orange-600 transition-all flex items-center justify-center">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
