import React, { useState } from "react";

const SeatingDetails = ({ seatingData, setSeatingData, setStep }) => {
  const [type, setType] = useState("");
  const [categoryCount, setCategoryCount] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleCategoryCountChange = (count) => {
    const num = parseInt(count, 10);
    setCategoryCount(num);
    setCategories(Array.from({ length: num }, () => ({
      seat_category_name: "",
      quantity: "",
      price: "",
      features: "",
      ticket_booking_allowed: true,
      expires_at: "",
    })));
  };

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const handleSubmit = () => {
    setSeatingData({ type, categories });
    setStep(5);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#7b2b41]">Seating Details</h2>
      
      <label>
        <span>Select Category Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg p-3"
        >
          <option value="" disabled>Select type</option>
          <option value="standing">Standing</option>
          <option value="sitting">Sitting</option>
        </select>
      </label>

      {type && (
        <label>
          <span>Number of Categories</span>
          <input
            type="number"
            min="1"
            value={categoryCount}
            onChange={(e) => handleCategoryCountChange(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg"
          />
        </label>
      )}

      {categories.map((category, index) => (
        <div key={index} className="space-y-2 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold">Category {index + 1}</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={category.seat_category_name}
            onChange={(e) => handleCategoryChange(index, "seat_category_name", e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={category.quantity}
            onChange={(e) => handleCategoryChange(index, "quantity", e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Price"
            value={category.price}
            onChange={(e) => handleCategoryChange(index, "price", e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Features"
            value={category.features}
            onChange={(e) => handleCategoryChange(index, "features", e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg"
          />
          <label>
            <input
              type="checkbox"
              checked={category.ticket_booking_allowed}
              onChange={(e) => handleCategoryChange(index, "ticket_booking_allowed", e.target.checked)}
            />
            Ticket Booking Allowed
          </label>
          <input
            type="datetime-local"
            placeholder="Expires At"
            value={category.expires_at}
            onChange={(e) => handleCategoryChange(index, "expires_at", e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      ))}

      <button onClick={handleSubmit} className="w-full p-3 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition">
        Next
      </button>
    </div>
  );
};

export default SeatingDetails;
