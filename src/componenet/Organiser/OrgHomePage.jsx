import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate
import { services } from './constant/constantData';
import { events } from './constant/constantData';

function OrgHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useNavigate(); // Step 2: Initialize useNavigate

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextSlide, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  const openServiceModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedService(null);
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero Section with Slider */}
      <div className="relative h-96 overflow-hidden">
        {events.map((event, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${event.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex items-center justify-center h-full">
              <h1 className="text-white text-4xl font-bold">{event.title}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#7b2b41]">What Can You Host</h2>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openEventModal(event)}
            >
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-[#7b2b41]">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-[#7b2b41]">What We Provide</h2>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openServiceModal(service)}
            >
              <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-[#7b2b41]">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Info Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-[#7b2b41]">{selectedEvent.title}</h2>
            <ul className="mb-4 list-disc pl-5">
              {selectedEvent.info.map((point, idx) => (
                <li key={idx} className="text-gray-600">• {point}</li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              {/* Step 3: Add onClick to navigate to /Authentication */}
              <button
                className="bg-[#7b2b41] text-white px-4 py-2 rounded hover:bg-[#9c4c65] transition duration-300"
                onClick={() => navigate('/Authentication')}
              >
                List Your Show
              </button>
              <button className="text-gray-500 hover:underline" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Info Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-[#7b2b41]">{selectedService.title}</h2>
            <ul className="mb-4 list-disc pl-5">
              {selectedService.info.map((point, idx) => (
                <li key={idx} className="text-gray-600">• {point}</li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <button className="bg-[#7b2b41] text-white px-4 py-2 rounded hover:bg-[#9c4c65] transition duration-300">
                Contact Us
              </button>
              <button className="text-gray-500 hover:underline" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrgHomePage;
