import React, { useEffect, useState } from 'react';
import GalleryData from '../data/Gallery.json';
import Navbar from '../common/Navbar';

const Gallery = ({isOpen, setIsOpen}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(GalleryData);
  }, []);

  return (
    <>
    <Navbar setIsOpen={setIsOpen} isOpen={isOpen}/>
      <div className="gallery-page px-5 py-10 bg-gray-100">
        <h1 className="text-center text-3xl pt-15 font-bold text-gray-800 mb-8">
          Ga<span className='text-orange-500'>ll</span>ery
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {data.map((d) => (
            <div key={d.id} className="flex flex-col items-center bg-slate-300 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300">
              <img
                key={d.id}
                src={d.photo}
                alt={d.title}
                className="w-full h-56 object-cover"
              />
              <div className='flex flex-row justify-between'>
             <h1 className=' z-10 text-amber-400 font-bold'><span className='text-black'>{d.rating}</span><i className="fa-solid fa-star"></i></h1>
             </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{d.title}</h2>
                <h3 className="text-md text-gray-600">{d.city}</h3>
                <p className="text-sm text-gray-700">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;