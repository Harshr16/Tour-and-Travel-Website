import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases, functions } from "../appwrite/appwrite";
import conf from "../configure/Config";
import { Query } from "appwrite";
import ClientNavbar from "../common/ClientNavbar";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

function ClientDashboard() {
  const [client, setClient] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const navigate = useNavigate();

  const cancellationReasons = [
    "Overbooking - No available rooms",
    "Maintenance Issues - Room is under repair",
    "Payment Issues - Payment not received",
    "Policy Violation - Booking did not meet hotel policies",
    "Operational Issues - Hotel emergency closure",
    "Other (Please specify)",
  ];

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const user = await account.get();
        console.log("Authenticated User:", user);

        const clientList = await databases.listDocuments(
          conf.appwriteDatabaseID,
          conf.appwriteClientCollectionID,
          [Query.equal("client_email", user.email)]
        );

        if (clientList.documents.length === 0) {
          console.error("Client not found in database!");
          navigate("/");
          return;
        }

        const clientData = clientList.documents[0];
        setClient(clientData);

        const bookingList = await databases.listDocuments(
          conf.appwriteDatabaseID,
          conf.appwriteCollectionID,
          [Query.equal("client_email", user.email)]
        );

        setBookings(bookingList.documents);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/");
      }
    };

    fetchClientData();
  }, [navigate]);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBooking(null);
    setSelectedReason("");
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking || !selectedReason) {
      alert("Please select a reason for cancellation.");
      return;
    }

    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        selectedBooking.$id
      );

      setBookings(bookings.filter((booking) => booking.$id !== selectedBooking.$id));

      await functions.createExecution(
        conf.appwriteFunctionID,
        JSON.stringify({
          email: selectedBooking.user_email,
          name: selectedBooking.user_name,
          reason: selectedReason,
          hotel: selectedBooking.hotel_name,
          check_in: selectedBooking.check_in_date,
          check_out: selectedBooking.check_out_date,
        })
      );

      alert("Booking canceled successfully! Email sent to the user.");
      closeModal();
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <ClientNavbar />
      <div className="p-26 flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white p-10 rounded-xl shadow-lg border border-gray-300">
          <h1 className="text-3xl text-center font-bold text-blue-600 mb-6">Client Dashboard</h1>
          {client ? (
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Welcome, {client.hotel_name}</h2>
              <p className="text-gray-600">Email: {client.client_email}</p>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading client data...</p>
          )}
          <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Your Bookings</h2>
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg border border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {["User Name", "User Email", "Hotel", "Check-in & Check-out", "Nights", "Guests", "Category", "Total Price", "Booking Id", "Action"].map((header) => (
                    <th key={header} className="px-4 py-3 border text-center">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.$id} className="border-b hover:bg-gray-100 transition duration-200">
                      <td className="px-4 py-3 border text-center">{booking.user_name}</td>
                      <td className="px-4 py-3 border text-center">{booking.user_email}</td>
                      <td className="px-4 py-3 border text-center">{booking.hotel_name}</td>
                      <td className="px-2 py-3 border text-center">{booking.check_in_date}<br /> <i class="fa-solid fa-arrows-up-down py-2"></i>  <br /> {booking.check_out_date}</td>
                      <td className="px-4 py-3 border text-center">{booking.num_nights}</td>
                      <td className="px-4 py-3 border text-center">{booking.num_guests}</td>
                      <td className="px-4 py-3 border text-center">{booking.category}</td>
                      <td className="px-4 py-3 border font-semibold text-green-600 text-center">Rs.{booking.total_price}</td>
                      <td className="px-4 py-3 border font-semibold text-green-600 text-center break-all">{booking.booking_id}</td>
                      <td className="px-4 py-3 border text-center">
                        <button onClick={() => openModal(booking)} className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition">Cancel</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-4 py-3 text-center text-gray-600 font-semibold">No bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white p-6 mt-70 rounded-lg shadow-lg w-96 mx-auto">
          <h2 className="text-lg font-bold mb-4">Select Cancellation Reason</h2>
          <select className="border p-2 w-full mb-4" value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
            <option value="">-- Select Reason --</option>
            {cancellationReasons.map((reason, index) => (
              <option key={index} value={reason}>{reason}</option>
            ))}
          </select>
          <button onClick={handleCancelBooking} className="bg-red-500 text-white px-4 py-2 rounded w-full">Confirm Cancellation</button>
        </motion.div>
      </Modal>
    </div>
  );
}

export default ClientDashboard;
