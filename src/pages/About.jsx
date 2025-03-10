import React from 'react';



import Navbar from '../common/Navbar';
import AboutCard from '../components/AboutCard';
import ContactCard from '../components/ContactCard';
import Footer from '../common/Footer';

const About = ({isOpen, setIsOpen}) => {
    return (
        <>
            <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
            <div className="about py-5 px-5 md:px-10 bg-gray-100">
                {/* Main Heading */}
                <h2 className="text-center pt-14 text-3xl font-bold text-gray-800 mb-8">
                    Why <span className='text-orange-500'>My</span>Tour?
                </h2>

                {/* About us  Cards */}
                <AboutCard/>

               {/* Contact Box */}
                <ContactCard/>
            </div>
            
        </>
    );
};

export default About;
