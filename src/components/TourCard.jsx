// import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import React from "react";

function TourCard({ name, location, imageUrl, description, rating }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full hover:scale-105 transition duration-300">
      {/* Image */}
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title & Location */}
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <i className="fa-solid  fa-location-dot text-red-500 mr-1" /> {location}
        </div>

        {/* Description  */}
        <p className="text-gray-600 flex-grow">{description}</p>

        {/* Rating  */}
        <div className="flex items-center mt-auto">
          <i className="fa-solid fa-star text-yellow-500 mr-1" />
          <span className="font-bold">{rating}</span>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
