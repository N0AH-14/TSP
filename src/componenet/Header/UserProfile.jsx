import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../../redux/reducers/authReducer';
import axios from 'axios';

function UserProfile({ toggleSidebar }) {
  const { loginWithRedirect, logout, user: authUser, isAuthenticated, isLoading, getAccessTokenSilently, } = useAuth0();
  const dispatch = useDispatch();
  
  // Select the user and authentication status from the Redux store
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTokenAndStoreUserData = async () => {
      if (isAuthenticated && authUser) {
        dispatch(setUser(authUser));

        try {
          // Get the access token silently
          const accessToken = await getAccessTokenSilently();

          // Prepare user data to send to backend
          const userData = {
            accessToken: accessToken || null,
            full_name: authUser.name || null,
            email_address: authUser.email || null,
            registered_at: new Date().toISOString(),
            age: authUser.age || 0, // Default to 0 if not present
            gender: authUser.gender || 'Not specified', // Default value
          };

          // Send user data to backend
          const response = await axios.post('http://localhost:5001/auth/callback', userData);

          // Check if response is successful
          if (response.status === 201) {
            console.log("User data stored in database:", response.data); // Log the response from the server
          } else {
            console.error("Failed to save user data:", response.data);
          }
        } catch (error) {
          console.error("Error fetching token or storing user data:", error.response?.data || error.message);
        }
      } else {
        dispatch(clearUser());
      }
    };

    fetchTokenAndStoreUserData();
  }, [isAuthenticated, authUser, dispatch, getAccessTokenSilently]);

  // Show loading state until Auth0 has determined authentication status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? (
        <>
          <button
            onClick={() => {
        dispatch(clearUser()); // Dispatch the action to clear user data
        logout({ returnTo: window.location.origin }); // Perform logout
      }}
            className="hidden lg:inline-block bg-[#7b2b41] text-white px-6 py-2 rounded-full hover:bg-[#6b2238] transition duration-300"
          >
            Log Out
          </button>
        </>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="hidden lg:inline-block bg-[#7b2b41] text-white px-6 py-2 rounded-full hover:bg-[#6b2238] transition duration-300"
        >
          Log In
        </button>
      )}

      <button className="flex flex-col items-center" onClick={toggleSidebar}>
        <div className="w-8 h-1 bg-[#7b2b41] mb-1 rounded"></div>
        <div className="w-8 h-1 bg-[#7b2b41] mb-1 rounded"></div>
        <div className="w-8 h-1 bg-[#7b2b41] rounded"></div>
      </button>
    </>
  );
}

export default UserProfile;
