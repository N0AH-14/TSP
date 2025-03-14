import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardView from '../compo/DasboardCompo/DashboardView';

function OrganiserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // State declarations
  const [userData, setUserData] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState('');
  const [phone_no, setPhoneNo] = useState(''); // Changed to phone_no to match the backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { email } = location.state || {};

  useEffect(() => {
    // Check if email is provided
    if (email) {
      // Fetch user data based on email
      axios.get(`http://localhost:5001/get-user?email=${email}`)
        .then((response) => {
          if (response.data.isNewUser) {
            setIsNewUser(true);
          } else {
            setUserData(response.data.user);
          }
        })
        .catch(() => {
          console.error('Error fetching user data');
          setError("Error fetching user data. Redirecting to login.");
          setTimeout(() => navigate('/Authentication'), 10000);
        })
        .finally(() => setLoading(false));
    } else {
      setError("No login email provided.");
      setTimeout(() => navigate('/Authentication'), 10000);
    }
  }, [email, navigate]);

  // Handle navigation based on user state
  useEffect(() => {
    if (!loading && !isNewUser && userData) {
      navigate('/Dashboard', { 
        state: { 
          name: userData.name, 
          email: userData.email, 
          phone_no: userData.phone_no // Ensure this matches your user object
        } 
      });
    }
  }, [loading, isNewUser, userData, navigate]);

  const handleRegistration = async () => {
    if (!name || !phone_no) { // Ensure you are checking phone_no here
      window.alert("Name and phone number are required.");
      return;
    }

    try {
      await axios.post('http://localhost:5001/register', { email, name, phone_no }); // Changed to phone_no
      setUserData({ email, name, phone_no }); // Changed to phone_no
      setIsNewUser(false);
      setName('');
      setPhoneNo(''); // Changed to phone_no
    } catch (error) {
      console.error('Error during registration:', error);
      window.alert("Registration failed. Please try again.");
    }
  };

  // Show loading state
  if (loading) return <p>Loading...</p>;

  // Show error message if any
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-md">
        {isNewUser ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Complete Your Registration</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" 
                placeholder="Enter your name" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
              <input 
                type="text" 
                value={phone_no} 
                onChange={(e) => setPhoneNo(e.target.value)} 
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" 
                placeholder="Enter your phone number" 
              />
            </div>
            <button 
              onClick={handleRegistration} 
              className="w-full bg-[#7b2b41] text-white py-2 rounded-md"
            >
              Register
            </button>
          </div>
        ) : (
          <p>You are being redirected...</p> // Optional message while redirecting
        )}
      </div>
    </div>
  );
}

export default OrganiserDashboard;
