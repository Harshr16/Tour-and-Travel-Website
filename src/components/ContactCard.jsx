import React from 'react'
import travelImage from '../assets/Travel6.jpeg';

function ContactCard() {
    return (
        <>
            <div
                className="contact-box mt-20 flex flex-col lg:flex-row items-center p-6 sm:p-10 rounded-xl bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${travelImage})`, minHeight: "400px" }}
            >
                {/* Left Side Heading */}
                <div className="w-full lg:w-2/3 text-white text-center lg:text-left mb-6 lg:mb-0 px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                        PLAN YOUR HOLIDAYS WITH OUR ASSISTANCE,
                        <br />
                        <span className="text-3xl sm:text-4xl">JUST FILL IN YOUR DETAILS.</span>
                    </h2>
                </div>

                {/* Right Side Form */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4  p-6 rounded-xl shadow-lg">
                    <input type="text" placeholder="Name" className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 bg-white/40 hover:scale-105 transition" />
                    <input type="text" placeholder="Mobile" className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 bg-white/40 hover:scale-105 transition" />
                    <input type="email" placeholder="Email" className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 bg-white/40 hover:scale-105 transition" />

                    {/* Checkbox */}
                    <div className="flex items-start space-x-2">
                        <input type="checkbox" className="mt-1 w-5 h-5 accent-red-500" />
                        <p className="text-sm text-white">
                            I hereby accept the <span className="text-blue-500 underline">Privacy Policy</span> and authorize MyTour companies to contact me.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button className="bg-orange-500 w-1/3 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-orange-600 transition">
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default ContactCard