import React from "react";

const VenueDetails = ({ venueData, setVenueData, setStep }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#7b2b41]">Venue Details</h2>
      <input
        type="text"
        placeholder="Venue Name"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={venueData.venue_name}
        onChange={(e) => setVenueData({ ...venueData, venue_name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Street Address"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={venueData.street_address}
        onChange={(e) => setVenueData({ ...venueData, street_address: e.target.value })}
        required
      />
      <input
        type="url"
        placeholder="Map URL"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={venueData.map_url}
        onChange={(e) => setVenueData({ ...venueData, map_url: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Max Capacity"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={venueData.max_capacity}
        onChange={(e) => setVenueData({ ...venueData, max_capacity: e.target.value })}
        required
      />
      <button onClick={() => setStep(4)} className="w-full p-3 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition">
        Next
      </button>
    </div>
  );
};

export default VenueDetails;
