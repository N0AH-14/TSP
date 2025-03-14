import React, { useState, useEffect, useRef } from 'react';
import SelectCity from './SelectCity';
import UserProfile from './UserProfile';
import Sidebar from './SideBar';
import { useAuth0 } from '@auth0/auth0-react';
import { FaSearch } from 'react-icons/fa';
import logo from '/Users/abhishekkumar/Desktop/ProjectCode001/01ProjectBookingWebsite/src/assets/take_your-removebg-preview.png';
import './Header.css';

function Header() {
  const { isAuthenticated, user } = useAuth0();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <header className="header">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-10 rounded-lg" />
      </div>

      <div className="flex-grow mx-6 hidden lg:flex">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Event you're looking for"
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b2b41] transition duration-300"

          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <SelectCity />
        <UserProfile toggleSidebar={toggleSidebar} />
      </div>

      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

export default Header;
