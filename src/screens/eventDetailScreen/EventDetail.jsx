import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../../assets/move2.avif";
import Sidebar from "../../componenet/Header/SideBar";
import Header from "../../componenet/Header/Header";
import Footer from "../../componenet/Footer/Footer";
import  ticketImage from "../../assets/photos/collegeFest.jpg"

const EventDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategoryType, setSelectedCategoryType] = useState(null);
  const [availableSeatCategories, setAvailableSeatCategories] = useState([]);
  const [selectedSeatCategory, setSelectedSeatCategory] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    phone_number: '',
    email: user?.email || '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  const defaultImage = img;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/takeyourticket/events/${id}`
        );
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Unable to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSelectCategoryType = (type) => {
    setSelectedCategoryType(type);
    const relatedSeats = event.seating.filter(
      (seat) => seat.category_type === type
    );
    setAvailableSeatCategories(relatedSeats);
    setSelectedSeatCategory(null); // Reset seat category on type change
  };

 const handleSelectSeatCategory = (category) => {
  setSelectedSeatCategory(category);
  const selectedTicket = event.tickets.find(
    (ticket) => ticket.category_id === category.id
  );
  setSelectedTicketId(selectedTicket ? selectedTicket.id : null); // Set the selected ticket ID
};

  const handleIncreaseTicket = () => {
    const availableQuantity = selectedTicketId
      ? event.tickets.find((ticket) => ticket.id === selectedTicketId)?.quantity
      : 0;
    if (ticketQuantity < availableQuantity) {
      setTicketQuantity(ticketQuantity + 1);
    }
  };

  const handleDecreaseTicket = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  const handleBookTickets = () => {
    if (!user) {
      alert("Please log in to book tickets.");
      return;
    }
    setShowModal(true); // Show the billing info modal
  };
const handleConfirmBooking = async () => {
  const ticketPrice =
    event.tickets.find((ticket) => ticket.id === selectedTicketId)?.price ||
    0;
  const totalAmount = ticketPrice * ticketQuantity;

  const userInfo = {
    user_auth0_id: user.sub,
    name: billingInfo.name,
    email: billingInfo.email,
    amount: totalAmount,
    description: `Booking for ${event.event_name}`,
    eventId: event.id,
    billingInfo,
  };

  try {
    const orderResponse = await axios.post(
      "http://localhost:5001/create-order",
      userInfo
    );
    const { order_id, amount, currency } = orderResponse.data;

    const options = {
      key: "rzp_test_XOWDtFSdmw6x5S",
      amount,
      currency,
      name: userInfo.name,
      description: userInfo.description,
      order_id,
    handler: async (response) => {
  // Construct payment data for verification
  const paymentData = {
  payment_id: response.razorpay_payment_id,
  order_id,
  signature: response.razorpay_signature,
  event_name: event.event_name,
  event_desc: event.description,
  event_starts_at: event.starts_at,
  event_ends_at: event.ends_at,
  city: event.city,
  event_feature: event.tickets.find((ticket) => ticket.id === selectedTicketId)?.features || "", // Updated syntax
  event_media: event.media?.[0]?.media_url || "", // Ensures media_url exists
  event_id: event.id, // Ensure event_id is included
  username: user.name,
  venue: event.venue?.venue_name || "", // Checks if venue exists
  user_id: user.sub, // Full user_id for backend substring operation
  ticket_quantity: ticketQuantity,
  total_amount: totalAmount,
  payment_method: "Razorpay",
  event_date: event.date_time,
  seat_category: selectedSeatCategory ? selectedSeatCategory.seat_category_name : null,
  category_id: selectedSeatCategory?.id,
  ticket_type: selectedCategoryType || null,
  billing_name: billingInfo?.name || "", // Include if billing details are required
  billing_address: (billingInfo?.street_address + "City: " + billingInfo.city + "State: " + billingInfo.state) || "", // Include if billing details are required
  billing_contact: (billingInfo?.email + "Phone no : " + billingInfo?.phone_number)  || "", // Include if billing details are required
};


  try {
    // Send payment data to the backend for verification and ticket generation
    
    const response = await axios.post("http://localhost:5001/verify-payment", paymentData);

    // Notify the user of successful payment
    alert("Payment successful!");

    // Navigate to the confirmation page with ticket details
  navigate("/confirmation", {
    
  state: {
    ticketId: response.data.ticket_id || "NA", // Ensure this is set correctly from the backend response
    ticketQuantity: ticketQuantity,
    totalAmount: totalAmount,
    eventName: event.event_name,
    eventDate: event.date_time,
    venue: event.venue.venue_name,
    seatCategory: selectedSeatCategory ? selectedSeatCategory.seat_category_name : null,
    ticketType: selectedCategoryType || null,
    user_id: user.sub || null,
    downloadUrl: response.data.ticket_pdf_url, // Consistent naming format
  },
});

  } catch (verificationError) {
    console.error("Payment verification error:", verificationError);
    alert("Payment verification failed. Please contact support.");
  }
},

      prefill: {
        name: userInfo.name,
        email: userInfo.email,
      },
      theme: {
        color: "#7b2b41",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (orderError) {
    console.error(
      "Booking failed:",
      orderError.response ? orderError.response.data : orderError.message
    );
    alert("Booking failed. Please try again.");
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="text-center p-8">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="text-center p-8">Event not found!</div>;
  }
  const mediaUrl = event.media[0]
    ? `http://localhost:5001/media/${event.media[0]?.media_url}`
    : '';
    console.log(mediaUrl)

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <button
          onClick={() => navigate("/")}
          className="text-white bg-[#7b2b41] hover:bg-[#5a1f30] font-bold py-2 px-4 rounded ml-4 mb-4 transition-transform transform hover:scale-105"
        >
          Go Back to Home
        </button>

        <div className="flex flex-col lg:flex-row items-start lg:space-x-8">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                className="w-full h-64 object-cover"
                src={
                  event.media.length > 0
                    ? mediaUrl
                    : defaultImage
                }
                alt={event.event_name}
              />
            </div>
          </div>

          {/* Event Details Section */}
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
            <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h1 className="text-2xl font-bold text-[#7b2b41]">
                {event.event_name}
              </h1>
              <p className="mt-2 text-gray-700">{event.description}</p>
              <h2 className="mt-4 text-lg font-semibold">Event Details</h2>
              <p>Date & Time: {new Date(event.date_time).toLocaleString()}</p>
              <p>Starts At: {new Date(event.starts_at).toLocaleString()}</p>
              <p>Ends At: {new Date(event.ends_at).toLocaleString()}</p>
              <p>City: {event.city || "City not specified"}</p>

              <h2 className="mt-4 text-lg font-semibold">Venue Details</h2>
              <p>
                Venue Name: {event.venue.venue_name || "Venue not specified"}
              </p>
              <p>
                Address: {event.venue.street_address || "Address not specified"}
              </p>
              <p>
                Max Capacity:{" "}
                {event.venue.max_capacity || "Capacity not specified"}
              </p>
              <p>
                Map:{" "}
                <a
                  href={event.venue.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {event.venue.map_url}
                </a>
              </p>

              <h2 className="mt-4 text-lg font-semibold">
                Select Ticket Category
              </h2>
              <div className="mt-2">
                {Array.from(
                  new Set(event.seating.map((seat) => seat.category_type))
                ).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleSelectCategoryType(type)}
                    className={`block w-full text-left p-2 border rounded mb-2 transition-colors duration-200 ${
                      selectedCategoryType === type
                        ? "bg-[#7b2b41] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {selectedCategoryType && (
                <>
                  <h2 className="mt-4 text-lg font-semibold">
                    Available Seats for "{selectedCategoryType}"
                  </h2>
                  {availableSeatCategories.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSelectSeatCategory(seat)}
                      className={`block w-full text-left p-2 border rounded mb-2 transition-colors duration-200 ${
                        selectedSeatCategory?.id === seat.id
                          ? "bg-[#7b2b41] text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {seat.seat_category_name}
                    </button>
                  ))}
                </>
              )}

              {selectedSeatCategory && selectedTicketId && (
                <>
                  <h2 className="mt-4 text-lg font-semibold">Ticket Details</h2>
                  <p>
                    Price:{" "}
                    {event.tickets.find(
                      (ticket) => ticket.id === selectedTicketId
                    )?.price || "0.00"}
                  </p>
                  <p>
                    Available Quantity:{" "}
                    {event.tickets.find(
                      (ticket) => ticket.id === selectedTicketId
                    )?.quantity || 0}
                  </p>

                  <h2 className="mt-4 text-lg font-semibold">
                    Select Ticket Quantity
                  </h2>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleDecreaseTicket}
                      className="bg-gray-200 p-2 rounded"
                    >
                      -
                    </button>
                    <span className="mx-4">{ticketQuantity}</span>
                    <button
                      onClick={handleIncreaseTicket}
                      className="bg-gray-200 p-2 rounded"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleBookTickets}
                      className="bg-[#7b2b41] text-white py-2 px-4 rounded"
                    >
                      Book Tickets
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={billingInfo.name}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={billingInfo.phone_number}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={billingInfo.email}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="text"
                name="street_address"
                placeholder="Street Address"
                value={billingInfo.street_address}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={billingInfo.city}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={billingInfo.state}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                value={billingInfo.postal_code}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={billingInfo.country}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <div className="mt-4">
                <button
                  onClick={handleConfirmBooking}
                  className="bg-[#7b2b41] text-white py-2 px-4 rounded"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;
