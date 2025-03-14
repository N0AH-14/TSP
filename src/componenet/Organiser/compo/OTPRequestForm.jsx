import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
const OTPRequestForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
   const navigate = useNavigate();
  // Request OTP
  const requestOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5001/send-otp', { email });
      setMessage(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      setMessage('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
  try {
    const response = await axios.post('http://localhost:5001/verify-otp', { email, otp });
    setMessage(response.data.message);
    console.log("Navigating to OrganiserDashboard"); // Add this
    navigate('/OrganiserDashboard', { state: { email } });
  } catch (error) {
    setMessage('Invalid or expired OTP');
  }
};


  return (
    <div className="min-h-screen flex">
      {/* Left Section: Benefits */}
      <div className="flex-1 bg-gray-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold text-[#7b2b41] mb-6">Benefits of using TakeYourTicket</h1>
        <p className="text-xl text-gray-600 mb-8">Our user friendly tools</p>

        <div className="space-y-6">
          <div className="flex items-center">
            <img src="https://uploads.commoninja.com/searchengine/wordpress/easy-registration-form.png" alt="Icon" className="h-12 w-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Quick & Easy Registration</h3>
              <p className="text-gray-500">Complete registration with PAN card and bank details.</p>
            </div>
          </div>
          <div className="flex items-center">
            <img src="data:image/png;base64,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" alt="Icon" className="h-12 w-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Take Your Events Live Superfast!</h3>
              <p className="text-gray-500">Publish your event before 24  including verification.</p>
            </div>
          </div>
          <div className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/4149/4149663.png" alt="Icon" className="h-12 w-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Monitor Analytics & Insights</h3>
              <p className="text-gray-500">Track sales, ticketing, and insights in real-time with dynamic pricing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: OTP Authentication */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <img src="/path/to/logo.png" alt="Logo" className="h-12 w-auto mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#7b2b41]">TakeYoutTicket</h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-[#7b2b41] focus:border-[#7b2b41]" 
              placeholder="Enter your email" 
            />
          </div>

          {isOtpSent ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">OTP Code:</label>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-[#7b2b41] focus:border-[#7b2b41]" 
                  placeholder="Enter the OTP" 
                />
              </div>
              <button 
                onClick={verifyOtp} 
                className="w-full bg-[#7b2b41] text-white py-2 rounded-md hover:bg-[#631a34] transition-colors"
              >
                Verify OTP
              </button>
            </>
          ) : (
            <button 
              onClick={requestOtp} 
              className="w-full bg-[#7b2b41] text-white py-2 rounded-md hover:bg-[#631a34] transition-colors"
            >
              Send OTP
            </button>
          )}

          {message && (
            <p className={`mt-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default OTPRequestForm;
