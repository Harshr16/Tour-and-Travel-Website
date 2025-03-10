import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { motion } from "framer-motion";
import { account, databases } from "../appwrite/appwrite"; // Import Appwrite
import conf from "../configure/Config";
import { Query } from 'appwrite'

const YourBooking = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const user = await account.get(); // Get logged-in user
                setCurrentUser(user);

                const response = await databases.listDocuments(
                    conf.appwriteDatabaseID,  // Database ID
                    conf.appwriteCollectionID,  // Collection ID
                    [Query.equal("user_id", user.$id)] // Filter by user ID
                );

                setBookings(response.documents);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                await databases.deleteDocument(
                    conf.appwriteDatabaseID, // Database ID
                    conf.appwriteCollectionID, // Collection ID
                    bookingId // Document ID to delete
                );

                setBookings(bookings.filter(booking => booking.$id !== bookingId));
                // alert("Booking cancelled successfully!");
            } catch (error) {
                console.error("Error cancelling booking:", error);
                alert("Failed to cancel booking.");
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <div className="container mx-auto p-6 flex-grow">
                    <h1 className="text-3xl font-bold text-center mb-6 p-15">
                        ✈️ Your <span className="text-orange-500">Bookings</span>
                    </h1>

                    {bookings.length === 0 ? (
                        <div className="text-center text-gray-600 flex flex-col items-center">
                            <p className="text-lg">Oops! You haven't booked any hotels yet.</p>
                            <button
                                onClick={() => navigate("/hotel")}
                                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                            >
                                Book Now
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-6">
                            {bookings.map((booking, index) => (
                                <motion.div
                                    key={booking.$id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full flex bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-400"
                                >
                                    {/* Left Side - Image */}
                                    <img
                                        src={booking.image_url || "/assets/default-hotel.jpg"}
                                        alt={booking.hotel_name}
                                        className="w-1/3 h-64 object-cover"
                                    />

                                    {/* Right Side - Content */}
                                    <div className="w-2/3 p-6 flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">{booking.hotel_name}</h2>

                                            {/* Location */}
                                            <p className="text-gray-600 flex items-center">
                                                <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                                                {booking.location}, {booking.city}
                                            </p>

                                            {/* Room Type */}
                                            <p className="text-sm text-blue-600 font-medium flex items-center">
                                                <i className="fas fa-bed mr-2"></i>
                                                {booking.category} Room
                                            </p>
                                            {/* Check-in */}
                                            <p className="text-sm text-gray-700 font-medium flex items-center">
                                                <i className="fas fa-calendar-alt mr-2 text-blue-600"></i>
                                                <span className="font-semibold text-gray-900">Check-in:</span>
                                                <span className="ml-1 text-gray-700">{formatDate(booking.check_in_date)}</span>
                                            </p>

                                            {/* Check-out */}
                                            <p className="text-sm text-gray-700 font-medium flex items-center">
                                                <i className="fas fa-calendar-check mr-2 text-red-500"></i>
                                                <span className="font-semibold text-gray-900">Check-out:</span>
                                                <span className="ml-1 text-gray-700">{formatDate(booking.check_out_date)}</span>
                                            </p>


                                            {/* Price */}
                                            <p className="text-lg font-semibold mt-2 flex items-center">
                                                <i className="fas fa-rupee-sign mr-2 text-green-500"></i>
                                                {booking.total_price} for {booking.num_nights} night(s)
                                            </p>

                                            {/* Amenities */}
                                            <div className="mt-3 flex flex-wrap gap-3">
                                                {Object.values(booking.amenities).slice(0, 5).map((amenity, i) => (
                                                    <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                                                        <i className="fas fa-check-circle mr-1"></i> {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Cancel Button */}
                                        <button
                                            onClick={() => handleCancelBooking(booking.$id)}
                                            className="mt-4 w-[150px] bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-all"
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default YourBooking;
