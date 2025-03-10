import React, { useState } from 'react';
import Tours from './pages/Tours';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './components/Layout';
import Gallery from './pages/Gallery';
import Login from './auth/Login';
import Hotel from './pages/Hotel';
import Booking from './pages/Booking';
import YourBooking from './pages/YourBooking';
import BookingSuccess from './pages/BookingSuccess';
import Signup from './auth/Signup';
// import Navbar from './common/Navbar';
import Verify from './auth/Verify';
import ClientDashboard from './pages/ClientDashboard';
import DashboardLayout from './components/DashboardLayout';


function App() {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <>
      <Router>
      
        <Routes >


          <Route path="/" element={<Layout isOpen={isOpen} setIsOpen={setIsOpen} />}>
            <Route index path='/' element={<Home setIsOpen={setIsOpen} isOpen={isOpen} />} />
            <Route path="/tour" element={<Tours setIsOpen={setIsOpen} isOpen={isOpen} />} />
            <Route path="/about" element={<About setIsOpen={setIsOpen} isOpen={isOpen} />} />
            <Route path="/gallery" element={<Gallery setIsOpen={setIsOpen} isOpen={isOpen} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hotel" element={<Hotel setIsOpen={setIsOpen} isOpen={isOpen} />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/your-booking" element={<YourBooking />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Route>


          <Route path="/client-dashboard" element={<DashboardLayout />}>
            <Route index element={<ClientDashboard />} />
          </Route>

        </Routes>
      </Router>
    </>








  );
}

export default App;