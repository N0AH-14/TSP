// EventList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/actions/eventActions';
import EventCard from './Event/EventCard';
import '.././css/EventList.css'; 
const EventList = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading events...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="event-list py-4 px-10 overflow-x-auto scrollbar-thin scrollbar-thumb-[#7b2b41] scrollbar-track-gray-200">
      <div className="flex space-x-6 animate-fadeIn"> 
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-[300px] bg-white shadow-lg rounded-xl p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
