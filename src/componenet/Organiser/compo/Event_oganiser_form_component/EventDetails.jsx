import React, { useState, useEffect } from "react";

const EventDetails = ({ eventData, setEventData, handleEventSubmit }) => {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  // List of Indian cities
  const cities = [
    "Agra", "Ahmedabad", "Bengaluru", "Bhopal", "Chennai", "Delhi", "Gurgaon",
    "Hyderabad", "Jaipur", "Kolkata", "Lucknow", "Mumbai", "Noida", "Pune",
    "Surat", "Vadodara", "Visakhapatnam", "Coimbatore", "Indore", "Nashik",
    "Patna", "Ranchi", "Thane", "Kochi", "Nagpur", "Dehradun", "Mysuru",
    "Srinagar", "Udaipur", "Bhubaneswar", "Aurangabad", "Gwalior", "Rourkela",
    "Jabalpur", "Vijayawada", "Faridabad", // Add more cities as needed
  ];

  useEffect(() => {
    // Set initial starts_at and ends_at dates to a future date
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 1); // Set to tomorrow

    setEventData((prevData) => ({
      ...prevData,
      starts_at: futureDate.toISOString().slice(0, 16), // Format for datetime-local
      ends_at: futureDate.toISOString().slice(0, 16), // Default ends_at to the same as starts_at
    }));
  }, [setEventData]);

  const handleCityChange = (e) => {
    const input = e.target.value;
    setEventData({ ...eventData, city: input });

    if (input) {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setCitySuggestions(filteredCities);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city) => {
    setEventData({ ...eventData, city });
    setCitySuggestions([]);
    setShowSuggestions(false);
  };

  const validateDates = () => {
    const now = new Date();
    const startDate = new Date(eventData.starts_at);
    const endDate = new Date(eventData.ends_at);
    let isValid = true;

    setStartDateError("");
    setEndDateError("");

    if (startDate < now) {
      setStartDateError("Start date cannot be today or in the past.");
      isValid = false;
    }

    if (endDate < startDate) {
      setEndDateError("End date cannot be before the start date.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDates()) {
      handleEventSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl text-center font-semibold text-[#7b2b41]">Event Details</h2>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Event Name</label>
        <input
          type="text"
          placeholder="Enter event name"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
          value={eventData.event_name}
          onChange={(e) => setEventData({ ...eventData, event_name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Enter description"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
          value={eventData.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-700 mb-1">Starts At (YYYY-MM-DDTHH:MM)</label>
        <input
          type="datetime-local"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
          value={eventData.starts_at}
          onChange={(e) => setEventData({ ...eventData, starts_at: e.target.value })}
          required
        />
        {startDateError && <p className="text-red-600 text-sm">{startDateError}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Ends At (YYYY-MM-DDTHH:MM)</label>
        <input
          type="datetime-local"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
          value={eventData.ends_at}
          onChange={(e) => setEventData({ ...eventData, ends_at: e.target.value })}
          required
        />
        {endDateError && <p className="text-red-600 text-sm">{endDateError}</p>}
      </div>
      
      <div className="relative">
        <label className="block text-sm text-gray-700 mb-1">City</label>
        <input
          type="text"
          placeholder="Enter city"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
          value={eventData.city}
          onChange={handleCityChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click on suggestion
          required
        />
        {showSuggestions && citySuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {citySuggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleCitySelect(city)}
                className="p-2 cursor-pointer hover:bg-[#7b2b41] hover:text-white"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <button type="submit" className="w-full p-3 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition">
        Next
      </button>
    </form>
  );
};

export default EventDetails;
