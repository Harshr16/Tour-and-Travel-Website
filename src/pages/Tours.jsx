import React, { useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import TourCard from "../components/TourCard";

import MaldivesImg from "../assets/Image1.jpg";
import HawaiiImg from "../assets/Image2.jpeg";
import BoraBoraImg from "../assets/Image3.jpeg";
import MauiImg from "../assets/Image4.jpg";
import CopacaImg from "../assets/Image5.jpeg";
import GoaImg from "../assets/Image6.jpg";
import BondiImg from "../assets/Image7.jpg";
import AmazonImg from "../assets/Image8.jpeg";
import YosemiteImg from "../assets/Image9.avif";
import EverestImg from "../assets/Image10.jpg";
import CanyonImg from "../assets/Image11.jpeg";
import MeecaImg from "../assets/Image12.jpeg";
import VaranasiImg from "../assets/Image13.jpg";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const toursData = {
  all: [
    { 
      name: "Maldives", 
      location: "Indian Ocean", 
      imageUrl: MaldivesImg, 
      description: "A luxurious paradise with crystal-clear waters, overwater bungalows, and stunning coral reefs. Ideal for honeymooners and beach lovers seeking tranquility and breathtaking scenery.", 
      rating: 4.9 
    },
    { 
      name: "Hawaii Beach", 
      location: "USA", 
      imageUrl: HawaiiImg, 
      description: "A tropical escape featuring golden beaches, volcanic landscapes, and mesmerizing sunsets. Enjoy surfing, hiking, and exploring rich Polynesian culture.", 
      rating: 4.7 
    },
    { 
      name: "Bora Bora", 
      location: "French Polynesia", 
      imageUrl: BoraBoraImg, 
      description: "Known for luxury overwater villas, pristine turquoise waters, and an enchanting atmosphere. Snorkeling and scuba diving here are a once-in-a-lifetime experience.", 
      rating: 4.8 
    },
    { 
      name: "Maui", 
      location: "Hawaii", 
      imageUrl: MauiImg, 
      description: "Home to lush rainforests, scenic waterfalls, and breathtaking coastal drives. The famous Road to Hana and Haleakalā sunrise are must-sees.", 
      rating: 4.6 
    },
    { 
      name: "Copacabana", 
      location: "Brazil", 
      imageUrl: CopacaImg, 
      description: "A lively beach in Rio de Janeiro famous for its golden sand, vibrant nightlife, and carnival festivities. A hotspot for both relaxation and party-goers.", 
      rating: 4.5 
    },
  ],
  beach: [
    { 
      name: "Goa", 
      location: "India", 
      imageUrl: GoaImg, 
      description: "India’s beach paradise with a mix of serene beaches, thrilling water sports, and rich Portuguese heritage. Enjoy its laid-back vibe and vibrant nightlife.", 
      rating: 4.4 
    },
    { 
      name: "Bondi Beach", 
      location: "Australia", 
      imageUrl: BondiImg, 
      description: "A world-famous beach known for its surf-friendly waves, coastal walks, and relaxed Aussie lifestyle. Perfect for sunbathing and people-watching.", 
      rating: 4.3 
    },
  ],
  nature: [
    { 
      name: "Amazon Rainforest", 
      location: "Brazil", 
      imageUrl: AmazonImg, 
      description: "The world's largest tropical rainforest, home to exotic wildlife, indigenous cultures, and unparalleled biodiversity. An adventure through nature’s untouched beauty.", 
      rating: 4.9 
    },
    { 
      name: "Yosemite", 
      location: "USA", 
      imageUrl: YosemiteImg, 
      description: "A breathtaking national park featuring giant granite cliffs, waterfalls, and ancient sequoia trees. A paradise for hikers and nature lovers.", 
      rating: 4.8 
    },
  ],
  adventure: [
    { 
      name: "Mount Everest", 
      location: "Nepal", 
      imageUrl: EverestImg, 
      description: "The highest mountain in the world, attracting climbers and trekkers seeking the ultimate challenge. A thrilling expedition filled with awe-inspiring landscapes.", 
      rating: 5.0 
    },
    { 
      name: "Grand Canyon", 
      location: "USA", 
      imageUrl: CanyonImg, 
      description: "A natural wonder carved by the Colorado River, showcasing stunning rock formations. Experience hiking, rafting, and breathtaking views.", 
      rating: 4.9 
    },
  ],
  religion: [
    { 
      name: "Mecca", 
      location: "Saudi Arabia", 
      imageUrl: MeecaImg, 
      description: "The holiest city in Islam, visited by millions of pilgrims annually. A place of deep spirituality, rich history, and architectural marvels.", 
      rating: 5.0 
    },
    { 
      name: "Varanasi", 
      location: "India", 
      imageUrl: VaranasiImg, 
      description: "One of the world’s oldest cities, known for its sacred Ganges River, spiritual ceremonies, and vibrant ghats. A mystical and profound experience.", 
      rating: 4.7 
    },
  ],
};

function Tours({isOpen,setIsOpen}) {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  

  return (
    <>
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>
    <div className="tours flex flex-col items-center py-12 bg-gray-50 min-h-screen pt-20" >

      {/* Heading */}
      <div className="text-center max-w-2xl mb-8">
        <h3 className="text-xl md:text-2xl font-medium text-orange-500">Explore Now</h3>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 my-2"><span className="text-orange-500">Find</span> Your <span className="text-orange-500">Dream</span> Destination</h2>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Category Filter */}
      <CategoryFilter selectedCategory={selectedCategory} setCategory={setSelectedCategory} />

      {/* Tour Cards */}
      <div className="w-full max-w-4xl mt-8 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {toursData[selectedCategory].map((tour, index) => (
          <TourCard key={index} {...tour} />
        ))}
      </div>
    </div>
    
    
    </>
  );
}

export default Tours;
