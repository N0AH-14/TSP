import React from 'react';
import { FaPhoneAlt, FaTicketAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <header className="bg-gray-800 text-white text-center">
      {/* Middle Section with "List Your Show" and Contact Button */}
      <div className="bg-gray-700 py-6 px-6 flex flex-col  text-center md:flex-row justify-center items-center text-center">
        {/* Text for "List Your Show" */}
        <div className="text-center md:text-left md:w-2/3 mb-4 md:mb-0">
          <h5 className="text-2xl font-bold text-white mb-2">List Your Show</h5>
          <p className="text-gray-300">
            Got a fest, event, or activity to share? Partner with <span className="text-[#7b2b41] font-semibold">TakeYourTicket</span> and get listed today to reach a wider audience and boost your event!
          </p>
        </div>

        {/* Contact Button */}
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <button className="bg-gradient-to-r from-[#7b2b41] to-[#7b2b41] text-white px-8 py-3 rounded-md transition duration-300 transform hover:scale-105 shadow-lg" onClick={() => {
            navigate('/OrgHomepage'); // Use navigate to redirect
          }}>
            Contact Today!
          </button>
        </div>
      </div>

      {/* Top Section with 3 Columns */}
      <div className="bg-gray-900 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <FaPhoneAlt className="text-[#7b2b41]" />
          <span className="text-gray-400">24/7 Customer Care</span>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <FaTicketAlt className="text-[#7b2b41]" />
          <span className="text-gray-400">Resend Booking Confirmation</span>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <MdEmail className="text-[#7b2b41]" />
          <span className="text-gray-400">Subscribe to the newsletter</span>
        </div>
      </div>

      {/* Main Navbar with Links */}
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10"
                src="https://example.com/logo.png" // Replace with your logo URL
                alt="TakeYourTicket"
              />
            </div>

            {/* Links */}
            <div className="hidden md:flex space-x-8 ">
              <a href="#" className="text-gray-300 hover:text-white text-base">Movies</a>
              <a href="#" className="text-gray-300 hover:text-white text-base">Upcoming Movies</a>
              <a href="#" className="text-gray-300 hover:text-white text-base">Sports</a>
              <a href="#" className="text-gray-300 hover:text-white text-base">Events</a>
              <a href="#" className="text-gray-300 hover:text-white text-base">Plays</a>
              <a href="#" className="text-gray-300 hover:text-white text-base">Activities</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
