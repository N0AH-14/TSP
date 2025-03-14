import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Adjusted import paths for your images
import move1 from '../../assets/move1.avif';
import move2 from '../../assets/move2.avif';
import move3 from '../../assets/move3.avif';

const CarsouelComp = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Add fade effect between slides
  };

  return (
    <div className="w-full   mb-4   relative"> {/* Container styling */}
      <Slider {...settings}>
        <div className="relative">
          <img
            src={move1}
            alt="Slide 1"
            className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-105" // Adjusted height
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100"> {/* Overlay effect */}
            <h2 className="  align-text-bottom text-white text-xl md:text-2xl font-bold">Welcome to Adventure</h2>
          </div>
        </div>
        <div className="relative">
          <img
            src={move2}
            alt="Slide 2"
            className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100">
            <h2 className="text-white text-xl md:text-2xl font-bold">Explore the World</h2>
          </div>
        </div>
        <div className="relative">
          <img
            src={move3}
            alt="Slide 3"
            className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100">
            <h2 className="text-white text-xl md:text-2xl font-bold">Adventure Awaits</h2>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default CarsouelComp;
