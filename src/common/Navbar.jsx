import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import { account } from '../appwrite/appwrite';
import ClientLogin from '../auth/ClientLogin';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Controls wheether modal is  open or close
  const [showSignup, setShowSignup] = useState(false); // Controls which form will be shown login or signup
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile nav menu
  const [clientLoginOpen, setClientLoginOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if a session exists before fetching user details
        const session = await account.getSession("current");
        // console.log("Session response: ", session);

        if (session) {
          const user = await account.get();
          // console.log("User: ", user)
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        if (error.code === 401) {
          // If session is invalid or expired, clear the user state
          console.warn("Session expired or invalid. Logging out...");
          setCurrentUser(null);
          await account.deleteSession("current").catch(() => { }); // Ensure stale session is removed
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, []);





  const handleLogout = async () => {
    await account.deleteSession("current");
    setCurrentUser(null);
    navigate('/');
  };

  const openModal = (isSignup = false) => {
    setShowSignup(isSignup);
    setIsOpen(true);
  };

  const isActive = (path) => (location.pathname === path ? 'text-orange-500 font-semibold' : 'text-black');


  return (
    <>
      <div className="fixed w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-8 py-4 text-black">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-orange-500">My</span>Tour
          </Link>

          {/*  Navigation for big screens */}
          <div className="hidden md:flex gap-12 [&>*]:hover:underline [&>*]:hover:text-orange-500">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/tour" className={isActive('/tour')}>Tours</Link>
            <Link to="/hotel" className={isActive('/hotel')}>Hotels</Link>
            <Link to="/about" className={isActive('/about')}>About us</Link>
            <Link to="/gallery" className={isActive('/gallery')}>Gallery</Link>
            {!currentUser &&
              <i
                className="fa-solid fa-user-secret text-2xl cursor-pointer hover:text-orange-500"
                onClick={() => setClientLoginOpen(true)}
              ></i>
            }
            
            {currentUser && (
              <>
                <Link to="/your-booking" className={isActive('/your-booking')}>Bookings</Link>
                {/* Font Awesome User Icon for Client Login */}

              </>
            )}

          </div>

          {/* Login/Logout Button */}
          <div className="hidden md:flex">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="bg-red-400 text-white px-4 py-2 rounded-full font-bold">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-orange-400 px-5 py-1 rounded-xl hover:bg-orange-500 hover:text-white/70 hover:underline hover:underline-offset-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div
                className="bg-orange-400 px-5 py-1 rounded-xl hover:bg-orange-500 hover:text-white/70 hover:underline hover:underline-offset-1 cursor-pointer"
                onClick={() => openModal(false)}
              >
                Login/Signup
              </div>
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Nav Menu For Mobile*/}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col bg-white shadow-md absolute top-full left-0 w-full px-8 py-4 gap-4"
            >
              <Link to="/" onClick={() => setMenuOpen(false)} className={`transition-all duration-200 transform hover:translate-x-2 hover:text-orange-500 ${isActive('/')}`}><span>Home</span></Link><hr />
              <Link to="/tour" onClick={() => setMenuOpen(false)} className={`transition-all duration-200 transform hover:translate-x-2 hover:text-orange-500 ${isActive('/tour')}`}>Tours</Link><hr />
              <Link to="/hotel" onClick={() => setMenuOpen(false)} className={`transition-all duration-200 transform hover:translate-x-2 hover:text-orange-500 ${isActive('/hotel')}`}>Hotels</Link><hr />
              <Link to="/about" onClick={() => setMenuOpen(false)} className={`transition-all duration-200 transform hover:translate-x-2 hover:text-orange-500 ${isActive('/about')}`}>About us</Link><hr />
              <Link to="/gallery" onClick={() => setMenuOpen(false)} className={`transition-all duration-200 transform hover:translate-x-2 hover:text-orange-500 ${isActive('/gallery')}`}>Gallery</Link><hr />
              {currentUser && (
                <>
                  <Link to="/your-booking" onClick={() => setMenuOpen(false)} className={isActive('/your-booking')}>Bookings</Link>
                  <i
                    className="fas fa-user-circle text-2xl cursor-pointer hover:text-orange-500"
                    onClick={() => setClientLoginOpen(true)}
                  ></i>
                </>
              )}


              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-orange-400 px-5 w-[150px]  py-1 rounded-xl hover:bg-orange-500 hover:text-white/70 hover:underline"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    openModal(false);
                    setMenuOpen(false);
                  }}
                  className="bg-orange-400 px-5 py-1 w-[150px] rounded-xl hover:bg-orange-500 hover:text-white/70 hover:underline cursor-pointer"
                >
                  Login/Signup
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login/Signup Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Modal Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div
                className="relative bg-white p-6 rounded-xl shadow-xl w-[400px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>

                {/* Login/Signup Forms */}
                {showSignup ? (
                  <Signup
                    closeModal={() => setIsOpen(false)}
                    openLogin={() => setShowSignup(false)}
                    setCurrentUser={setCurrentUser}
                  />
                ) : (
                  <Login
                    closeModal={() => setIsOpen(false)}
                    openSignup={() => setShowSignup(true)}
                    setCurrentUser={setCurrentUser}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Client Login Modal */}
      <AnimatePresence>
        {clientLoginOpen && (
          <ClientLogin
            closeModal={() => setClientLoginOpen(false)}
            setCurrentUser={(user) => {
              setCurrentUser(user);
              setClientLoginOpen(false);
              navigate('/client-dashboard');  // Redirect after login
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
