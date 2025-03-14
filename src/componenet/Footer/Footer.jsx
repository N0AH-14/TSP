import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Festivals Happening Now */}
          <div>
            <h5 className="text-white font-bold mb-4">FESTIVALS HAPPENING NOW</h5>
            <ul className="leading-relaxed space-y-2">
              <li>Music Fest 2024</li>
              <li>Art Expo 2024</li>
              <li>Food Carnival</li>
              <li>Tech Summit</li>
              <li>Film Fest</li>
            </ul>
          </div>

          {/* Festivals by Type */}
          <div>
            <h5 className="text-white font-bold mb-4">FESTIVALS BY TYPE</h5>
            <ul className="leading-relaxed space-y-2">
              <li>Music Festivals</li>
              <li>Art & Culture</li>
              <li>Food & Beverage</li>
              <li>Technology Summits</li>
              <li>Fashion Shows</li>
            </ul>
          </div>

          {/* Upcoming Events */}
          <div>
            <h5 className="text-white font-bold mb-4">UPCOMING FESTIVALS</h5>
            <ul className="leading-relaxed space-y-2">
              <li>Summer Fest 2024</li>
              <li>Global Art Fair</li>
              <li>Innovation Expo 2024</li>
              <li>Winter Fest 2024</li>
              <li>Fashion Week</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="text-white font-bold mb-4">CONTACT US</h5>
            <ul className="leading-relaxed space-y-2">
              <li>Email: takeyourticket@gmail.com</li>
              <li>Phone: +91 9934601244</li>
              <li>Address: Sitapura,Jaipur</li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="my-8 border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2024 TakeyourTicket Pvt. Ltd. All Rights Reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-red-800 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
