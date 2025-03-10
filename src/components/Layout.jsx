import React from "react";
import Footer from "../common/Footer"; 
import { Outlet } from "react-router-dom"; // Allows nested routes to be rendered
import Navbar from "../common/Navbar";

const Layout = ({ isOpen, setIsOpen }) => {
  return (
    <div>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} /> {/* Normal Navbar */}
      <main>
        <Outlet />
      </main>
     <Footer/>
    </div>
  );
};

export default Layout;
