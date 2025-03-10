import React from 'react'
import trusted1 from '../assets/trusted1.png';
import responsive from '../assets/responsive.png';
import experience from '../assets/experience.png';
import handshake from '../assets/handshake.png';
import recognize from '../assets/recognize.png';

function AboutCard() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[
                    { img: trusted1, title: 'Trusted Advisor', text: 'Over 75 Years of expertise with innovation at its core. We pioneered group travel in India & are continuously evolving, investing in cutting-edge technology for a perfect holiday.' },
                    { img: responsive, title: 'Responsive', text: 'Our Holidays are co-created with our Customers, ensuring suggestions and feedback are the basics of creating magical holidays.' },
                    { img: experience, title: 'Memorable Experience', text: 'Join the MyTour family! Over 5 Lac customers have created their most memorable experience with us. Explore exotic destinations, immerse in diverse cultures, and experience world-class hospitality with MyTour.' },
                    { img: handshake, title: 'Ease', text: 'Choose from a wide range of over a thousand holidays and experiences. Special holidays catering to the cultural diversity of India.' },
                    { img: recognize, title: 'Recognize & Connect', text: 'An experienced team of over 1000 travel professionals across 160+ touchpoints in India & NRI markets to cater to your travel needs.' },
                ].map((card, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center hover:shadow-xl hover:scale-105 transition duration-300 h-full">
                        <div className="h-20 flex justify-center items-center">
                            <img className="w-24 h-auto object-contain" src={card.img} alt={card.title} />
                        </div>
                        <h1 className="text-xl font-bold pt-3 text-center">{card.title}</h1>
                        <p className="text-gray-800 text-md text-center leading-relaxed mt-3 flex-grow">{card.text}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AboutCard