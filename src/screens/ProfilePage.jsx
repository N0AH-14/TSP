import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use axios for requests
import Header from '../componenet/Header/Header';
import Navbar from '../componenet/Navbar/Navbar';
import Footer from '../componenet/Footer/Footer';
import img1 from '../assets/photos/profile1.jpg';
import img2 from '../assets/photos/profile2.jpg';
import img3 from '../assets/photos/profile3.jpg';
import img4 from '../assets/photos/profile4.jpg';
import img5 from '../assets/photos/profile5.jpg';
import img6 from '../assets/photos/profile6.jpg';
import img7 from '../assets/photos/profile7.jpg';
import img8 from '../assets/photos/profile8.jpg';
import img9 from '../assets/photos/profile9.jpg';
import img10 from '../assets/photos/profile10.jpg';

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // Get the token silently
  const [profileData, setProfileData] = useState({
    full_name: '',
    email_address: '',
    age: '',
    gender: '',
  });
  const [randomImageNumber, setRandomImageNumber] = useState(0); // Start at 0 for random image
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]; // Image array

  useEffect(() => {
    setRandomImageNumber(Math.floor(Math.random() * images.length)); // Generate a random number
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile(user.sub);
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async (auth0_id) => {
    try {
      const token = await getAccessTokenSilently(); // Get the access token
      const response = await axios.get(`http://localhost:5001/user/${auth0_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData({
        full_name: response.data.full_name || '',
        email_address: response.data.email_address || '',
        age: response.data.age || '',
        gender: response.data.gender || '',
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(profileData.email_address)) {
      alert('Please enter a valid email.');
      return;
    }

    if (profileData.age < 0) {
      alert('Age cannot be negative.');
      return;
    }

    try {
      const token = await getAccessTokenSilently(); // Get the access token
      const response = await axios.put(`http://localhost:5001/user/${user.sub}`, profileData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        setIsEditing(false);
        fetchUserProfile(user.sub); // Refresh the profile data after update
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile.');
    }
  };

  if (!isAuthenticated) return <div>Please log in to view your profile.</div>;

  return (
    <>
      <Header />

      {/* Home Button */}
      <div className="flex justify-center mt-6">
        <button
          className="flex items-center bg-[#7b2b41] text-white py-2 px-4 rounded-lg hover:bg-[#632035] transition duration-300"
          onClick={() => navigate('/')}
        >
          <AiOutlineHome className="mr-2" /> Home
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Profile Banner */}
        <div className="bg-gradient-to-b from-[#7b2b41] to-[#4c1b2e] rounded-lg shadow-lg p-8 text-white relative">
          {/* Profile image */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={images[randomImageNumber]}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-16 ml-40">
            <h2 className="text-4xl font-bold">{profileData.full_name}</h2>
            <p className="text-lg">{profileData.age}</p>
            <p className="text-md text-gray-200">{profileData.email_address}</p>
            <p className="text-md">{profileData.gender}</p>
          </div>
          <button
            className="absolute top-10 right-10 bg-[#681329] text-white py-2 px-4 rounded-lg hover:bg-[#632035] transition duration-300"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-[#7b2b41]">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700">Full Name:</label>
                  <input
                    type="text"
                    name="full_name"
                    value={profileData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b2b41]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email_address"
                    value={profileData.email_address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b2b41]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={profileData.age || ''}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b2b41]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Gender:</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b2b41]"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#7b2b41] text-white py-2 px-4 rounded-lg hover:bg-[#632035] transition duration-300"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>

      <Navbar />
      <Footer />
    </>
  );
};

export default ProfilePage;
