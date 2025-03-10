import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { account, databases } from "../appwrite/appwrite";
import Navbar from "../common/Navbar";
import conf from "../configure/Config";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Query } from "appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlane,
    faCocktail,
    faUtensils,
    faSpa,
    faSwimmer,
    faDumbbell,
    faBed,
    faConciergeBell,
    faBuilding,
    faMusic,
    faWifi,
    faParking,
    faGlassMartini,
} from "@fortawesome/free-solid-svg-icons";


const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const rentPerNightData = searchParams.get("rent_per_night");
    const hotel = {
        id: uuidv4(),
        name: searchParams.get("name"),
        location: searchParams.get("location"),
        city: searchParams.get("city"),
        type: searchParams.get("type"),
        image: searchParams.get("image"),
        client_id: searchParams.get("client_id") || "",
        client_email: searchParams.get("client_email") || "",
        rent_per_night: rentPerNightData ? JSON.parse(rentPerNightData) : {},
        amenities: JSON.parse(searchParams.get("amenities") || "[]"),
        category: JSON.parse(searchParams.get("category") || "[]"),
    };

    const amenityIcons = {
        "Airport Shuttle": faPlane,
        "Rooftop Bar": faCocktail,
        "Luxury Dining": faUtensils,
        "Spa & Wellness": faSpa,
        "Luxury Spa": faSpa,
        "Infinity Pool": faSwimmer,
        "Fine Dining": faUtensils,
        "Ocean View Rooms": faBed,
        "Business Center": faBuilding,
        "Bar": faGlassMartini,
        "Butler Service": faConciergeBell,
        "Exclusive Dining": faUtensils,
        "Business Lounge": faBuilding,
        "24-hour Room Service": faConciergeBell,
        "Nightclub": faMusic,
        "Free WiFi": faWifi,
        "Swimming Pool": faSwimmer,
        "Spa": faSpa,
        "Fitness Center": faDumbbell,
        "Restaurant": faUtensils,
        "Pool": faSwimmer,
        "Gym": faDumbbell,
    };

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [numNights, setNumNights] = useState(1);
    const [numGuests, setNumGuests] = useState(1);
    const [roomCategory, setRoomCategory] = useState(hotel.category.length > 0 ? hotel.category[0] : "");
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);

    const categories = hotel.category.length > 0 ? hotel.category : Object.keys(hotel.rent_per_night || {});

    useEffect(() => {
        if (categories.length > 0 && !roomCategory) {
            setRoomCategory(categories[0]);
        }
    }, [categories, roomCategory]);

    useEffect(() => {
        if (hotel.rent_per_night[roomCategory]) {
            setTotalPrice(numNights * hotel.rent_per_night[roomCategory]);
        } else {
            setTotalPrice(0);
        }
    }, [numNights, roomCategory, hotel.rent_per_night]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await account.get();
                setCurrentUser(user);
            } catch (error) {
                console.error("User not logged in:", error);
                setCurrentUser(null);
            }
        };

        fetchUser();
    }, []);

    const handleCheckOutChange = (e) => {
        setCheckOutDate(e.target.value);
        if (checkInDate) {
            const inDate = new Date(checkInDate);
            const outDate = new Date(e.target.value);
            const diffTime = outDate - inDate;
            const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
            setNumNights(calculatedNights);
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // Handle Razorpay Payment
    const handlePayment = async () => {
        if (!currentUser) {
            alert("You must be logged in to book a hotel.");
            return;
        }

        const options = {
            key: "rzp_test_VVAkOucmewoFd2", // Razorpay Test Key
            amount: totalPrice * 100, // Convert ₹ to paise
            currency: "INR",
            name: hotel.name,
            description: "Hotel Booking Payment",
            image: hotel.image,
            handler: function (response) {
                console.log("Payment Successful! Payment ID:"  + response.razorpay_payment_id)
                // alert(
                //     "Payment Successful! Payment ID: " + response.razorpay_payment_id
                // );
                handleBooking(response.razorpay_payment_id); // Call Booking after Payment
                navigate("/booking-success")
            },
            prefill: {
                name: currentUser.name,
                email: currentUser.email,
                // contact: currentUser.number,
            },
            notes: {
                hotel_name: hotel.name,
                total_price: totalPrice,
            },
            theme: {
                color: "#3399cc",
            },
        };

        if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            alert("Razorpay SDK failed to load. Refresh and try again.");
        }
    };


    const handleBooking = async (razorpay_payment_id) => {
        if (!currentUser) {
            alert("You must be logged in to book a hotel.");
            return;
        }

        const clientDetails = {
            client_id: hotel.client_id,  // Storing the hotel's client ID
            client_email: hotel.client_email,  // Storing the hotel's email
            hotel_name: hotel.name,
            location: hotel.location,
            category: roomCategory,

        };

        try {
            // Step 1: Check if the hotel client already exists
            const clientList = await databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteClientCollectionID,
                [
                    Query.equal("client_id", hotel.client_id) // Checking by hotel.client_id
                ]
            );

            if (clientList.documents.length === 0) {
                // Step 2: If the hotel client doesn't exist, add to Client Collection
                await databases.createDocument(
                    conf.appwriteDatabaseID,
                    conf.appwriteClientCollectionID,
                    uuidv4(), // Generate a unique ID for the client
                    clientDetails
                    [Permission.read(`user:${currentUser.$id}`)]
                );
            }

            // Step 3: Store booking details
            const bookingDetails = {
                booking_id: uuidv4(),
                user_id: currentUser.$id, // Logged-in user
                user_name: currentUser.name || "Guest",
                user_email: currentUser.email || "No email",
                client_id: hotel.client_id, // Hotel's client ID
                client_email: hotel.client_email, // Hotel's email
                hotel_name: hotel.name,
                location: hotel.location,
                city: hotel.city,
                image_url: hotel.image,
                category: roomCategory,
                num_nights: parseInt(numNights, 10),
                num_guests: parseInt(numGuests, 10),
                price_per_night: parseInt(hotel.rent_per_night[roomCategory]),
                total_price: parseInt(totalPrice),
                amenities: hotel.amenities.join(", "),
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
                payment_id: razorpay_payment_id,
            };

            await databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                uuidv4(),
                bookingDetails
            );

            console.log("Booking successful!");

            // Redirect to checkout
            // const res = await fetch("http://localhost:8000/checkout", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         items: [
            //             {
            //                 id: 1,
            //                 quantity: numNights,
            //                 price: hotel.rent_per_night[roomCategory],
            //                 name: hotel.name
            //             }
            //         ]
            //     })
            // });

            // if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            // const data = await res.json();
            // if (data.url) {
            //     window.location.href = data.url;
            // } else {
            //     console.log("No URL received from backend");
            // }
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Error booking hotel. Try again.");
        }
    };


    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row items-start justify-center bg-gray-50 min-h-screen py-40 px-4 lg:px-20"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl flex flex-col lg:flex-row gap-8"
                >
                    <div className="w-full lg:w-1/2">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-80 object-cover rounded-lg shadow-md" />
                        <div className="mt-6 p-4 bg-white-100 rounded-lg ">
                            <h1 className="text-3xl font-bold">{hotel.name}</h1>
                            <p className="text-gray-600">{hotel.location}, {hotel.city}</p>
                            <p className="text-blue-600 font-medium">{hotel.type} Hotel</p>
                            <p className="text-xl font-bold text-gray-800">₹{hotel.rent_per_night[roomCategory] || "N/A"} / night</p>
                            <h3 className="text-lg font-semibold mt-3">Amenities:</h3>
                            <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm mt-2">
                                {hotel.amenities.map((amenity, index) => (
                                    <span key={index} className="flex items-center gap-2 bg-blue-100 w-40 text-blue-700 px-2 py-1 rounded-md">
                                        <FontAwesomeIcon icon={amenityIcons[amenity] || faUtensils} className="text-blue-500" />

                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-4">
                        <h3 className="text-2xl text-center text-orange-500 font-bold">Booking <span className="text-black">Details</span> </h3>
                        <label className="block">Check-in Date:</label>
                        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-2 border rounded-md" />
                        <label className="block">Check-out Date:</label>
                        <input type="date" value={checkOutDate} onChange={handleCheckOutChange} className="w-full p-2 border rounded-md" />
                        <p className="text-lg">Total Nights: {numNights}</p>
                        <label className="block">Guests:</label>
                        <input type="number" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} className="w-full p-1 border rounded-md" min="1" />
                        <label className="block">Category:</label>
                        <select
                            value={roomCategory}
                            onChange={(e) => setRoomCategory(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <p className="text-lg font-bold">Total Price: ₹{totalPrice}</p>
                        <motion.button className="w-[160px] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600" onClick={handlePayment}>Book Now</motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Booking;
