import React from "react";

const TicketDetails = ({ ticketData, setTicketData, setStep }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#7b2b41]">Ticket Details</h2>
      <input
        type="text"
        placeholder="Category ID"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={ticketData.category_id}
        onChange={(e) => setTicketData({ ...ticketData, category_id: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={ticketData.quantity}
        onChange={(e) => setTicketData({ ...ticketData, quantity: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={ticketData.price}
        onChange={(e) => setTicketData({ ...ticketData, price: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Features"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={ticketData.features}
        onChange={(e) => setTicketData({ ...ticketData, features: e.target.value })}
      />
      <input
        type="datetime-local"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={ticketData.expires_at}
        onChange={(e) => setTicketData({ ...ticketData, expires_at: e.target.value })}
      />
      <button onClick={() => setStep(6)} className="w-full p-3 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition">
        Next
      </button>
    </div>
  );
};

export default TicketDetails;
