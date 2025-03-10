import React from 'react';


function Footer() {
    return (
        <div className="Footer py-10 px-5 text-gray-800 bg-gradient-to-t from-[#dcc1b6] to-[#f3e1da]"
        >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

                {/* Left Side */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-2xl font-bold mb-4">
                        <span className="text-orange-500">My</span>Tour
                    </h4>
                    <div className="icons flex gap-4 mt-2">
                        <i className="fa-brands fa-facebook text-gray-600 hover:text-orange-400 text-2xl cursor-pointer"></i>
                        <i className="fa-brands fa-twitter text-gray-600 hover:text-orange-400 text-2xl cursor-pointer"></i>
                        <i className="fa-brands fa-instagram text-gray-600 hover:text-orange-400 text-2xl cursor-pointer"></i>
                    </div>
                </div>

                {/* Center - Information */}
                <div>
                    <h4 className="font-semibold text-xl mb-3">Information</h4>
                    {["Home", "Explore", "Travel", "Blog"].map((item) => (
                        <p key={item} className="hover:text-orange-500 cursor-pointer transition-all duration-300 transform hover:translate-x-2">{item}</p>
                    ))}
                </div>

                {/* Center - Helpful Links */}
                <div>
                    <h4 className="font-semibold text-xl mb-3">Helpful Link</h4>
                    {["Destination", "Support", "Travel & Condition", "Privacy"].map((item) => (
                        <p key={item} className="hover:text-orange-500 cursor-pointer  transition-all duration-300 transform hover:translate-x-2">{item}</p>
                    ))}
                </div>

                {/* Right Side  */}
                <div>
                    <h4 className="font-semibold text-xl mb-3">Contact Details</h4>
                    <p className="hover:text-orange-500 transition-all duration-300 transform hover:translate-x-2">+91 9974535655</p>
                    <p className="hover:text-orange-500 transition-all duration-300 transform hover:translate-x-2">harshnrudani@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
