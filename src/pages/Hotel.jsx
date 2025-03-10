import React, { useEffect, useState } from "react";
import HotelData from "../data/Hotel.json";
import Navbar from "../common/Navbar";
import Login from "../auth/Login"; 
import { account } from "../appwrite/appwrite";

const Hotel = ({ setIsOpen, isOpen }) => {
    const [hData, setHData] = useState([]);
    const [currentUser,setCurrentUser] = useState();

    useEffect(() => {
        setHData(HotelData);

        const fetchData = async (e)=>{
            try {
                const user = await account.get();
                setCurrentUser(user);
            } catch (error) {
                console.error("User not logged in:", error);
                setCurrentUser(null);
            }
        }
        fetchData();
    }, []);

    const handleBooking = (hotel) => {
        
        if (currentUser) {
            const queryParams = new URLSearchParams({
                name: hotel.name,
                location: hotel.location,
                city: hotel.city,
                type: hotel.type,
                image: hotel.image,
                client_id: hotel.client_id,
                client_email: hotel.client_email,
                rent_per_night: JSON.stringify(hotel.rent_per_night),
                amenities: JSON.stringify(hotel.amenities),
                category: JSON.stringify(hotel.category),
            }).toString();

            window.open(`/booking?${queryParams}`, "_blank");
        } else {
            alert("Please login before booking a hotel!"); 
            setIsOpen(true);
        }
    };

    return (
        <>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            
            {/*  Login popup is shown when `isOpen` is true */}
            {isOpen && <Login closeModal={() => setIsOpen(false)} />}
            
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 pt-15">
                    Hotels <span className="text-orange-500">in</span> India
                </h1>

                {/* Hotel Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 [&>*]:hover:cursor-pointer">
                    {hData.map((h, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-2xl hover:scale-105 transition duration-300 flex flex-col h-full"
                            onClick={() => handleBooking(h)}
                        >
                            {/* Hotel Image */}
                            <img
                                src={h.image}
                                alt={h.name}
                                className="w-full h-52 object-cover"
                            />

                            {/* Hotel Details */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold">{h.name}</h2>
                                <p className="text-gray-600">{h.location}, {h.city}</p>
                                <p className="text-sm text-blue-600 font-medium">{h.type} Hotel</p>
                                <p className="text-lg font-semibold mt-2">
                                    ₹{h.rent_per_night?.Standard || "N/A"} / night
                                </p>

                             
                                <div className="flex-grow"></div>

                               
                                <button
                                    onClick={() => handleBooking(h)}
                                    className="mt-3 w-[150px] bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Hotel;
