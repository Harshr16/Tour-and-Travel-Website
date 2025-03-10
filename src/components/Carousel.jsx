import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, [slides.length]); // Only re-run if the slides length changes

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Slide Container */}
      <div
        className="flex transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((s, index) => (
          <div key={index} className="w-full min-w-full h-screen relative">
            <img
              src={s}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Unlock Your Travel Dream With Us
        </h1>
        <p className="text-lg md:text-xl text-white mt-4 drop-shadow-lg">
          Life is too short for just one trip!
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg text-lg " onClick={()=>navigate("/hotel")}>
          Get Started
        </button>
      </div>

      {/* Left Navigation Button */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 bg-opacity-50 p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft size={40} className="text-black " />
      </button>

      {/* Right Navigation Button */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 bg-opacity-50 p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight size={40} className="text-black" />
      </button>
    </div>
  );
}

export default Carousel;
