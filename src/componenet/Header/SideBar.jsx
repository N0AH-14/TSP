// src/components/Sidebar.jsx
import React, { useRef, useEffect } from 'react';
import { clearUser } from '../../redux/reducers/authReducer';
import { FaUser, FaShoppingCart, FaHistory, FaClipboardList, FaLifeRing, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux';
function Sidebar({ sidebarOpen, toggleSidebar }) {
  const sidebarRef = useRef(null);
  const { logout, user, isAuthenticated } = useAuth0(); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleSidebar]);

  if (!sidebarOpen) return null;

  return (
    <div ref={sidebarRef} className="fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform translate-x-0 rounded-l-lg overflow-hidden">
      <div className="p-4 space-y-4">
        <h2 className="font-semibold text-lg text-[#7b2b41]">Menu</h2>
        {isAuthenticated && (
          <div className="text-[#7b2b41] font-bold text-lg">
            Welcome Back, {user.name}!
          </div>
        )}
        <button
          className="flex items-center space-x-2 p-2 rounded transition-colors duration-300 ease-in-out text-[#7b2b41] hover:bg-[#7b2b41] hover:text-white hover:shadow-lg"
          onClick={() => {
            navigate('/profile'); // Use navigate instead of history.push
            toggleSidebar(); // Optional: Close the sidebar after navigation
          }}
        >
          <FaUser />
          <span>Profile</span>
        </button>
        <button className="flex items-center space-x-2 p-2 rounded transition-colors duration-300 ease-in-out text-[#7b2b41] hover:bg-[#7b2b41] hover:text-white hover:shadow-lg"
        onClick={()=>{
          navigate('/my-booking')
        }}
        >
          <FaShoppingCart />
          <span>My Bookings</span>
        </button>
        <button className="flex items-center space-x-2 p-2 rounded transition-colors duration-300 ease-in-out text-[#7b2b41] hover:bg-[#7b2b41] hover:text-white hover:shadow-lg">
          <FaHistory />
          <span>Booking History</span>
        </button>
        <button className="flex items-center space-x-2 p-2 rounded transition-colors duration-300 ease-in-out text-[#7b2b41] hover:bg-[#7b2b41] hover:text-white hover:shadow-lg">
          <FaClipboardList />
          <span>My Orders</span>
        </button>
        <button className="flex items-center space-x-2 p-2 rounded transition-colors duration-300 ease-in-out text-[#7b2b41] hover:bg-[#7b2b41] hover:text-white hover:shadow-lg">
          <FaLifeRing />
          <span>Help</span>
        </button>
        <button
          className="flex items-center space-x-2 p-2 rounded transition-colors duration-300 ease-in-out text-[#7b2b41] hover:bg-[#7b2b41] hover:text-white hover:shadow-lg"
          onClick={() => {
        dispatch(clearUser()); // Dispatch the action to clear user data
        logout({ returnTo: window.location.origin }); // Perform logout
      }}
        >
         
          {isAuthenticated? (  <><FaSignOutAlt /><span>Log Out</span></>) :  <><FaSignInAlt /><span>Log In</span></>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
