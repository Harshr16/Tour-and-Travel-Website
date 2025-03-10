import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-green-600"
        >
          🎉 Booking Successful!
        </motion.h1>

        <p className="text-gray-600 mt-4">
          Your booking has been confirmed. You will receive a confirmation email shortly.
        </p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6"
        >
          <Link
            to="/your-booking"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Your Bookings
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
