// EventCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/move2.avif'; // Adjust the path as necessary

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/event/${event.id}`); // Redirect to event details page with the event ID
  };

  // Calculate total available tickets
  const totalAvailableTickets = event.tickets.reduce((total, ticket) => total + ticket.quantity, 0);

  // Trim the description if it's too long
  const trimmedDescription = event.description.length > 100 
    ? `${event.description.substring(0, 100)}...` 
    : event.description;

 // Construct media URL
  const mediaUrl = event.media[0]
    ? `http://localhost:5001/media/${event.media[0]?.media_url}`
    : '';
    console.log(mediaUrl)
    
  return (
    <div
      className="bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 
      hover:scale-105 hover:shadow-2xl max-w-sm mx-auto my-4 cursor-pointer animate-fadeIn"
      onClick={handleNavigation} // Trigger navigation on card click
    >
      {/* Event Image Section */}
      <div className="relative">
        <img 
          className="w-full h-60 object-cover rounded-t-2xl" 
          src={mediaUrl} 
          alt={mediaUrl} 
        />
        <div className={`absolute top-4 right-4 text-white text-sm font-semibold rounded-full px-4 py-1 shadow-md
          ${totalAvailableTickets > 0 ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {totalAvailableTickets > 0 ? 'Available' : 'Sold Out'}
        </div>
      </div>

      {/* Event Details Section */}
      <div className="p-6 flex flex-col justify-between h-80">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.event_name}</h3>
          <p className="text-gray-700 mb-4">{trimmedDescription}</p>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Date:</strong> {new Date(event.date_time).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> {event.venue.venue_name || 'Venue Not Specified'}</p>
            <p><strong>Tickets Available:</strong> {totalAvailableTickets}</p>
            <p><strong>Ticket Price:</strong> {Number(event.tickets[0]?.price).toFixed(2) || 'N/A'}</p>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="pt-4">
          <button
            className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-300 
              ${totalAvailableTickets > 0 ? 'bg-[#7b2b41] hover:bg-[#6a2538]' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={totalAvailableTickets === 0}
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking the button
              handleNavigation();
            }}
          >
            {totalAvailableTickets > 0 ? 'Book Now' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    event_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date_time: PropTypes.string.isRequired,
    venue: PropTypes.shape({
      venue_name: PropTypes.string,
    }),
    tickets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })).isRequired,
  }).isRequired,
};

export default EventCard;
