import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaFileAlt,
  FaCalendarCheck,
  FaClock,
  FaHeadset,
  FaSignOutAlt,
  FaPlusCircle,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

function DashboardView() {
  const location = useLocation();
  const { email } = location.state || {};

  // State to hold organiser details
  const [organiserDetails, setOrganiserDetails] = useState({
    name: "",
    phone_no: "",
  });
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error message

  // Fetch organiser details when the component mounts
  useEffect(() => {
    const fetchOrganiserDetails = async (email) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/eventOrganiser/detail",
          { eventOrganiser_email: email }
        );
        const { name, phone_no } = response.data; // Use phone_no to match the database
        setOrganiserDetails({ name, phone_no });
        localStorage.setItem('organiserDetails', JSON.stringify({ email }));
        console.log(email); // Set the state with fetched data
      } catch (error) {
        console.error(
          "Error fetching organiser details:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to fetch organiser details."); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (email) {
      fetchOrganiserDetails(email); // Call the function if email exists
    }
  }, [email]); // Dependency array includes email

  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  // Render loading state
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  // Render error message if any
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
const handleLogout = () => {
  localStorage.removeItem('organiserDetails');
    // Clear stored data
  // Redirect or update the UI as needed
   window.location.href = '/OTPRequestForm';
} ;

  return (
    <div className="flex h-screen w-screen bg-[#1a1c23]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2c2f36] text-gray-200 p-6 space-y-6 h-full fixed top-0 left-0">
        <div className="text-center text-2xl font-semibold text-[#7b2b41] mb-8">
          Event Manager{" "}
          <h1 className="text-white mt-5">{organiserDetails.name}</h1>
        </div>
        <nav className="space-y-4">
          <Link 
            to="/Accountsetup"
            state={{ email }} // Ensure 'email' is defined in the parent component
            className="flex items-center p-3 rounded-lg bg-[#383b44] hover:bg-[#4b4e58] transition duration-200"
          >
            <FaCheckCircle className="mr-3 text-white text-xl" />
            <span className="text-white">Verify the details</span>
          </Link>

          <Link
            to="/EventOrganiseForm"
            state={{ email }}
            className="flex items-center p-3 rounded-lg bg-[#383b44] hover:bg-[#4b4e58] transition duration-200"
          >
            <FaPlusCircle className="mr-3" />
            <span>Organize an Event</span>
          </Link>
          <Link
            to="/Organiser_event_request"
            state={{ organizerEmail: email }} // Ensure it's passed here
            className="flex items-center p-3 rounded-lg bg-[#383b44] hover:bg-[#4b4e58] transition duration-200"
          >
            <FaCalendarCheck className="mr-3" />
            <span>Event-status</span>
          </Link>

         
         <Link
            to="/real-time-dashborad"
            state={{ email : email }} // Ensure it's passed here
            className="flex items-center p-3 rounded-lg bg-[#383b44] hover:bg-[#4b4e58] transition duration-200"
          >
            <FaChartLine className="mr-3" />
            <span>Real-time Analytics</span>
          </Link>
          <a
            href="#"
            className="flex items-center p-3 rounded-lg hover:bg-[#4b4e58] transition duration-200"
          >
            <FaFileAlt className="mr-3" />
            <span>Conditions & Agreements</span>
          </a>
          <a
            href="#"
            className="flex items-center p-3 rounded-lg hover:bg-[#4b4e58] transition duration-200"
          >
            <FaHeadset className="mr-3" />
            <span>Help & Support</span>
          </a>
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg hover:bg-[#4b4e58] transition duration-200 text-red-400"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#1a1c23] ml-64 h-full fixed top-0 right-0 ">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-200 bg-[#7b2b41] px-4 py-2 rounded-lg mb-6 hover:bg-[#9c3c58] transition duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="bg-[#2c2f36] p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#7b2b41]">
            User Dashboard
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-3 bg-[#383b44] rounded-lg">
              <p className="text-gray-400 font-medium">Name:</p>
              <p className="text-white">{organiserDetails.name}</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#383b44] rounded-lg">
              <p className="text-gray-400 font-medium">Email:</p>
              <p className="text-white">{email}</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#383b44] rounded-lg">
              <p className="text-gray-400 font-medium">Phone:</p>
              <p className="text-white">{organiserDetails.phone_no}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardView;
