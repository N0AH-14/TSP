import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organizerEmail } = location.state || {};
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  const fetchEvents = async () => {
    if (!organizerEmail) {
      setError("Organizer email is missing!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/takeyourticket/events_request/${organizerEmail}`);
      setEvents(response.data);
    } catch (error) {
      setError("Failed to fetch events.");
      console.error("Fetch Events Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (event) => setSelectedEvent(event);
  const clearSelectedEvent = () => setSelectedEvent(null);

  const handleCancelEvent = async (eventId) => {
  try {
    const response = await axios.delete(`http://localhost:5001/takeyourticket/delete_event/${eventId}`);
    if (response.status === 200) {
      setShowAnimation(true); // Trigger Lottie animation
      setTimeout(() => {
        setShowAnimation(false); // Stop the animation after it’s shown once
        setShowModal(false); // Close modal after animation
        fetchEvents();
        clearSelectedEvent(); // Refresh events list
      }, 5000); // Adjust the delay as needed for your animation
    } else {
      alert("Failed to cancel the event.");
    }
  } catch (error) {
    console.error("Error deleting event:", error.response?.data?.error || error.message);
    alert(`Failed to cancel event: ${error.response?.data?.error || "Unknown error"}`);
  }
};


  useEffect(() => {
    fetchEvents();
  }, [organizerEmail]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <button
        onClick={() => navigate("/Dashboard", { state: { email: organizerEmail } })}
        className="mb-8 bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition"
      >
        Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-8">Events</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p className="mt-4 text-lg">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleCardClick(event)}
              className="relative p-6 bg-gradient-to-b from-gray-700 to-gray-900 text-white rounded-3xl shadow-xl transition duration-300 hover:scale-105 cursor-pointer"
            >
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  event.is_accepted === 1 ? 'bg-green-600' : 'bg-yellow-500'
                }`}
              >
                {event.is_accepted === 1 ? 'Accepted' : 'Pending'}
              </span>

              {event.media?.[0]?.media_url && (
                <img
                  src={`http://localhost:5001/media/${event.media[0].media_url}`}
                  alt="Event Media"
                  className="w-full h-48 object-cover rounded-lg mb-6 shadow-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/default-image.jpg'; }}
                />
              )}

              <h2 className="text-2xl font-bold text-center">{event.event_name}</h2>
              <div className="mt-4 text-sm text-center opacity-75 space-y-2">
                <p>Organizer: {organizerEmail}</p>
                <p>City: {event.city}</p>
                <p>Starts At: {new Date(event.starts_at).toLocaleString()}</p>
                <p>Ends At: {new Date(event.ends_at).toLocaleString()}</p>
                <p>Venue: {event.venue.venue_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="mt-12 p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">{selectedEvent.event_name}</h2>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <p><strong>Starts At:</strong> {new Date(selectedEvent.starts_at).toLocaleString()}</p>
          <p><strong>Ends At:</strong> {new Date(selectedEvent.ends_at).toLocaleString()}</p>
          <p><strong>City:</strong> {selectedEvent.city}</p>
          <p><strong>Venue:</strong> {selectedEvent.venue.venue_name} at {selectedEvent.venue.street_address}</p>
          <p><strong>Max Capacity:</strong> {selectedEvent.venue.max_capacity}</p>
          <p><strong>Map:</strong> <a href={selectedEvent.venue.map_url} target="_blank" className="text-blue-400 underline">View Map</a></p>

          {selectedEvent.media?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Media:</h3>
              <div className="flex flex-wrap mt-2 gap-2">
                {selectedEvent.media.map((mediaItem, index) => (
                  <div key={index} className="w-32 h-32">
                    {mediaItem.media_type === 'image' ? (
                      <img
                        src={`http://localhost:5001/media/${mediaItem.media_url}`}
                        alt={`Event Media ${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <video controls className="w-full h-full object-cover rounded">
                        <source src={`http://localhost:5001/${mediaItem.media_url}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
<div className="flex space-x-4 mt-6">
  <button
    onClick={() => setShowModal(true)}
    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
  >
    Cancel Event
  </button>
  
 <button 
  onClick={clearSelectedEvent} 
  className="text-blue-400 hover:text-blue-600 underline font-semibold py-2 px-4 rounded-lg border-2 border-blue-400 hover:border-blue-600 transition-all"
>
  Clear Selection
</button>

</div>

        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p className="mb-6">You are about to cancel this event. All associated details will be deleted. Are you sure you want to proceed?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 py-2 px-4 rounded hover:bg-gray-700 transition"
              >
                No, Go Back
              </button>
              <button
                onClick={() => handleCancelEvent(selectedEvent.id)}
                className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Yes, Cancel Event
              </button>
            </div>
          </div>
        </div>
      )}

      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <iframe
            src="https://lottie.host/embed/e7f0c8df-f28c-419e-95a0-ed17be5e4e58/YHif01gSSN.json"
            className="w-64 h-64"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default EventStatus;
