import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Carousel from "../components/Carousel";
import Img1 from "../assets/Img1.jpg";
import Img2 from "../assets/Img4.jpeg";
import Img3 from "../assets/Img2.avif";
import Tours from "./Tours";
import About from "./About";
import Gallery from "./Gallery";
import Login from "../auth/Login";
import { account } from "../appwrite/appwrite";

function Home({isOpen, setIsOpen}) {
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  return (
    <>
      <Navbar  isOpen={isOpen} setIsOpen={setIsOpen}/>
      {/* {isOpen && <Login onClose={() => setIsLoginOpen(false)} />} */}
      <Carousel slides={[Img1, Img2, Img3]} />
      <Tours />
      <About />
      
    </>
  );
}

export default Home;
